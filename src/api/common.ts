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

export const GITHUB_API_BASE_URL = "https://api.github.com";

export const TOTAL_PROBLEMS = 75;

export const ALTERNATIVE_IDS: Record<string, string> = {
  // 1기
  meoooh: "han",
  koreas9408: "seunghyun-lim",
  leokim0922: "leo",

  // 2기
  obzva: "flynn",
  "kim-young": "kimyoung",
  kjb512: "kayden",
  lymchgmk: "egon",
  jeonghwanmin: "hwanmini",
};
