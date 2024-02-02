import { Request, Response, NextFunction } from "express";
import { NotFoundException } from "../http-exceptions";
import serverResponse from "../helpers/server-response";

export default function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  serverResponse.error(res, new NotFoundException("route not found"));
}
