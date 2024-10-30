type ErrorHandler = (message: string, error: unknown) => void;

const defaultErrorHandler: ErrorHandler = (message, error) => {
  if (error instanceof Error) {
    console.error(`${message}: ${error.message}`);
  } else {
    console.error(message, error);
  }
};

export function handleError(
  message: string,
  error: unknown,
  handler = defaultErrorHandler,
): void {
  handler(message, error);
}
