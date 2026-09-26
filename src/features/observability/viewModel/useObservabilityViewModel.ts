import {
  getAnalytics,
  logEvent,
  logScreenView as firebaseLogScreenView,
} from "@react-native-firebase/analytics";
import { getAuth } from "@react-native-firebase/auth";
import {
  getCrashlytics,
  log,
  recordError,
} from "@react-native-firebase/crashlytics";
import { getPerformance } from "@react-native-firebase/perf";
import { getApp } from "@react-native-firebase/app";

type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue>;
type PerformanceAttributes = Record<string, string>;

const firebaseApp = getApp();
const analyticsInstance = getAnalytics(firebaseApp);
const authInstance = getAuth(firebaseApp);
const crashlyticsInstance = getCrashlytics();
const performanceInstance = getPerformance(firebaseApp);

export const useObservabilityViewModel = () => {
  const withPerformanceTrace = async <T>(
    name: string,
    operation: () => Promise<T>,
    attributes: PerformanceAttributes = {},
  ): Promise<T> => {
    let trace: Awaited<
      ReturnType<typeof performanceInstance.startTrace>
    > | null = null;

    try {
      trace = await performanceInstance.startTrace(name);
      Object.entries(attributes).forEach(([key, value]) => {
        trace?.putAttribute(key, value);
      });
      await trace?.start();
    } catch (error) {
      if (__DEV__)
        console.warn(`Performance trace start failed: ${name}`, error);
    }

    try {
      return await operation();
    } finally {
      try {
        await trace?.stop();
      } catch (error) {
        if (__DEV__)
          console.warn(`Performance trace stop failed: ${name}`, error);
      }
    }
  };

  const logAnalyticsEvent = async (
    name: string,
    params?: AnalyticsParams,
  ): Promise<void> => {
    try {
      await logEvent(analyticsInstance, name, {
        ...params,
        userId: authInstance.currentUser?.uid ?? "anonymous",
      });
    } catch (error) {
      if (__DEV__) console.warn(`Analytics event failed: ${name}`, error);
    }
  };

  const logScreenView = async (
    screenName: string,
    screenClass: string,
  ): Promise<void> => {
    try {
      await firebaseLogScreenView(analyticsInstance, {
        screen_name: screenName,
        screen_class: screenClass,
      });
    } catch (error) {
      if (__DEV__)
        console.warn(`Analytics screen failed: ${screenName}`, error);
    }
  };

  const getErrorCode = (error: unknown): string => {
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = (error as { code?: unknown }).code;
      if (typeof code === "string" && code.length <= 40) return code;
    }

    return "unknown_error";
  };

  const logHandledError = async (
    operation: string,
    error: unknown,
    params: AnalyticsParams = {},
  ): Promise<void> => {
    const errorCode = getErrorCode(error);

    try {
      await Promise.all([
        logAnalyticsEvent("operation_failed", {
          operation,
          error_code: errorCode,
          ...params,
        }),
        recordError(
          crashlyticsInstance,
          error instanceof Error ? error : new Error(errorCode),
        ),
      ]);
      log(crashlyticsInstance, `operation_failed:${operation}:${errorCode}`);
    } catch (loggingError) {
      if (__DEV__)
        console.warn(`Error logging failed: ${operation}`, loggingError);
    }
  };

  return {
    withPerformanceTrace,
    logAnalyticsEvent,
    logScreenView,
    logHandledError,
  };
};
