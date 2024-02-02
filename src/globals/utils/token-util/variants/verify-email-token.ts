import jwt from "jsonwebtoken";
import {
  AuthTokenPayload,
  ITokenUtility,
  TOKEN_TYPES,
  TokenOptions,
  TokenPayload,
  _1_WEEK,
} from "../token.types";
import { AuthenticationException } from "../../../http-exceptions";

export class VerifyEmailTokenUtility implements ITokenUtility {
  constructor(protected readonly secret: string) {}

  create<T = any>(payload: T, options?: TokenOptions) {
    const { expiresIn = _1_WEEK } = options || {};
    const tokenPayload: TokenPayload<T> = {
      data: payload,
      type: TOKEN_TYPES.VERIFY_EMAIL,
    };

    const token = jwt.sign(tokenPayload, this.secret, {
      expiresIn,
    });

    return { token, expiresIn: expiresIn + Date.now() };
  }

  verify<T = any>(token: string) {
    try {
      const payload = jwt.verify(token, this.secret) as TokenPayload<T>;

      if (payload.type !== TOKEN_TYPES.VERIFY_EMAIL) {
        throw new AuthenticationException("invalid token");
      }

      return payload.data;
    } catch (err: any | Error) {
      let errMessage = err.message
        ? (err.message as string).replaceAll("jwt", "token")
        : "authentication failed";
      throw new AuthenticationException(errMessage);
    }
  }
}
