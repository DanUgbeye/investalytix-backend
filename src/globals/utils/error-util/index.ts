import { ZodError } from "zod";
import { InputValidationError } from "./error.types";

export class ErrorUtility {
  formatZodError(error: ZodError): InputValidationError {
    let validationErrors: InputValidationError = {};

    error.issues.forEach((issue) => {
      let path = issue.path[0] as string;
      let message = issue.message;
      validationErrors[path] = message;
    });

    return validationErrors;
  }

  getFirstErrorMessage(error: InputValidationError) {
    let [path, message = ""] = Object.entries(error)[0];

    return message.toLowerCase().includes(path.toLowerCase())
      ? message
      : `${path} is ${message}`.toLocaleLowerCase();
  }
}

const errorUtil = new ErrorUtility();
export default errorUtil;
