import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../http-exceptions";
import { RequestValidationSchema } from "../../types/validation.types";
import { ZodError } from "zod";
import errorUtility from "../utils/error-util";
import serverResponse from "../helpers/server-response";

export default function validateRequest(schemas: RequestValidationSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (schemas.body) {
        let body = schemas.body.parse(req.body);
        req.body = body;
      }

      if (schemas.params) {
        let params = schemas.params.parse(req.params);
        req.params = params;
      }

      if (schemas.query) {
        let query = schemas.query.parse(req.query);
        req.query = query;
      }

      next();
    } catch (error: any) {
      let errMessage: string = "validation failed";
      let errors;

      if (error instanceof ZodError) {
        errors = errorUtility.formatZodError(error);
        errMessage = errorUtility.getFirstErrorMessage(errors);
      } else {
        errMessage = error.message;
      }

      serverResponse.error(res, new ValidationException(errMessage, errors));
    }
  };
}
