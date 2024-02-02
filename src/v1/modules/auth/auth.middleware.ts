import { NextFunction, Request, Response } from "express";
import { UserRole } from "../user/user.types";
import HttpException, {
  AuthenticationException,
  AuthorizationException,
} from "@/globals/http-exceptions";
import ServerResponse from "@/globals/helpers/server-response";
import { AuthTokenPayload } from "@/globals/utils/token-util/token.types";
import { accessTokenUtil } from "@/globals/utils/token-util";

export type UserAuthOptions = {
  role?: UserRole;
  required?: boolean;
};

export class AuthMiddleware {
  authenticateUser(options?: UserAuthOptions) {
    return async function (req: Request, res: Response, next: NextFunction) {
      const { role, required = true } = options || {};
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return required
          ? ServerResponse.error(
              res,
              new AuthenticationException("access token not found")
            )
          : next();
      }

      let token = authHeader.split(" ")[1];

      if (!token) {
        throw new AuthenticationException("invalid access token");
      }

      let userPayload: AuthTokenPayload;

      try {
        userPayload = accessTokenUtil.verify(token);
      } catch (error: any | HttpException) {
        if (required) {
          return ServerResponse.error(
            res,
            new AuthenticationException(error.message)
          );
        } else {
          return next();
        }
      }

      if (!required) {
        req.user = userPayload;
        return next();
      }

      let verified = true;

      // if a particular role is specified, verify it
      if (role) {
        verified = false;
      }

      if (!verified) {
        return ServerResponse.error(
          res,
          new AuthorizationException("Permission denied")
        );
      }

      next();
    };
  }
}

const authMiddleware = new AuthMiddleware();
export default authMiddleware;
