import log, {
  LoggingMethod,
  LogLevelNames,
  LogLevelNumbers,
  MethodFactory,
} from "loglevel";

// Define log format
const originalFactory: MethodFactory = log.methodFactory;

log.methodFactory = function (
  methodName: LogLevelNames,
  logLevel: LogLevelNumbers,
  loggerName: string | symbol
): LoggingMethod {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return function (...args: Parameters<typeof console.log>) {
    const time = new Date().toISOString();
    const prefix = `[${time}] [${methodName.toUpperCase()}]${loggerName ? ` [${loggerName as string}]` : ""}`;
    rawMethod(prefix, ...args);
  };
};

const isDev: boolean = import.meta.env.MODE === "development";
log.setLevel(isDev ? "debug" : "warn");

// Optionally expose method to get logger per module
export function getLogger(moduleName?: string) {
  return moduleName ? log.getLogger(moduleName) : log;
}

export default log;
