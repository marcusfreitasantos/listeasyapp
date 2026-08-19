import analytics from "@react-native-firebase/analytics";
import crashlytics from "@react-native-firebase/crashlytics";
import perf from "@react-native-firebase/perf";

type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue>;

type PerformanceAttributes = Record<string, string>;

export const withPerformanceTrace = async <T>(
  name: string,
  operation: () => Promise<T>,
  attributes: PerformanceAttributes = {},
): Promise<T> => {
  let trace: Awaited<ReturnType<ReturnType<typeof perf>["startTrace"]>> | null =
    null;

  try {
    trace = await perf().startTrace(name);
    Object.entries(attributes).forEach(([key, value]) => {
      trace?.putAttribute(key, value);
    });
    await trace?.start();
  } catch (error) {
    if (__DEV__) console.warn(`Performance trace start failed: ${name}`, error);
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

export const logAnalyticsEvent = async (
  name: string,
  params?: AnalyticsParams,
): Promise<void> => {
  try {
    await analytics().logEvent(name, params);
  } catch (error) {
    if (__DEV__) console.warn(`Analytics event failed: ${name}`, error);
  }
};

export const logScreenView = async (
  screenName: string,
  screenClass: string,
): Promise<void> => {
  try {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass,
    });
  } catch (error) {
    if (__DEV__) console.warn(`Analytics screen failed: ${screenName}`, error);
  }
};

const getErrorCode = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string" && code.length <= 40) return code;
  }

  return "unknown_error";
};

export const logHandledError = async (
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
      crashlytics().recordError(
        error instanceof Error ? error : new Error(errorCode),
      ),
    ]);
    crashlytics().log(`operation_failed:${operation}:${errorCode}`);
  } catch (loggingError) {
    if (__DEV__)
      console.warn(`Error logging failed: ${operation}`, loggingError);
  }
};
