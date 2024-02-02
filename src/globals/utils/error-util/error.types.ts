export type InputValidationError<E extends Object = Record<string, string>> = {
  [path in keyof E]?: string;
};
