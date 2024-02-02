import { Response } from "express";
import { HttpException, InternalServerException } from "../http-exceptions";

function success(res: Response, message: string): void;
function success(res: Response, message: string, code: number): void;
function success<T>(res: Response, message: string, data: T): void;
function success<T>(
  res: Response,
  message: string,
  data: T,
  code: number
): void;
function success<T>(...args: (Response | string | number | T)[]) {
  const res = args[0] as Response;
  let code: number = 200;
  let data: any = undefined;
  let message: string = "success";

  switch (args.length) {
    case 2: {
      message = args[1] as string;
      code = 200;
      break;
    }

    case 3: {
      message = args[1] as string;
      if (typeof args[2] === "number") {
        code = args[2];
      } else {
        data = args[2] as T;
      }
      break;
    }

    case 4: {
      message = args[1] as string;
      code = args[2] as number;
      data = args[3] as T;
      break;
    }
  }

  res.status(code).json({
    success: true,
    code,
    message,
    data,
  });
}

function error(res: Response, error: HttpException): void;
function error(res: Response, error: Error): void;
function error(res: Response, message: string, code: number): void;
function error(
  ...args: (Response | HttpException | Error | string | number)[]
): void {
  const res = args[0] as Response;
  let exception: HttpException = new InternalServerException();

  switch (args.length) {
    case 2: {
      if (args[1] instanceof HttpException) {
        exception = args[1];
      } else {
        let err = args[1] as Error;
        exception = new HttpException(err.message);
      }
      break;
    }

    case 3: {
      exception = new HttpException(args[1] as string, args[2] as number);
      break;
    }
  }

  res.status(exception.getCode()).json({
    success: false,
    ...exception.toObject(),
  });
}

const serverResponse = { success, error };

export default serverResponse;
