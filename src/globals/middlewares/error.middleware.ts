import { NextFunction, Request, Response } from "express";
import HttpException from "../http-exceptions";
import { InternalServerException } from "../http-exceptions";
import serverResponse from "../helpers/server-response";

export default async function globalErrorHandler(
  err: HttpException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let error: HttpException;
  if (err instanceof HttpException) {
    error = err;
  } else {
    error = new InternalServerException(err.message);
  }

  serverResponse.error(res, error);
}
