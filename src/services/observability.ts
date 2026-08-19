import analytics from "@react-native-firebase/analytics";
import crashlytics from "@react-native-firebase/crashlytics";

type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue>;

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
