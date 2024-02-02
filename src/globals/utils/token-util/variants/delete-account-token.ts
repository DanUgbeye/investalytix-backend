import jwt from "jsonwebtoken";
import {
  ITokenUtility,
  TOKEN_TYPES,
  TokenOptions,
  TokenPayload,
  _1_HOUR,
} from "../token.types";
import { AuthenticationException } from "../../../http-exceptions";

export class DeleteAccountTokenUtility implements ITokenUtility {
  constructor(protected readonly secret: string) {}

  create<T = any>(payload: T, options?: TokenOptions) {
    const { expiresIn = _1_HOUR } = options || {};
    const tokenPayload: TokenPayload<T> = {
      data: payload,
      type: TOKEN_TYPES.DELETE_ACCOUNT,
    };

    const token = jwt.sign(tokenPayload, this.secret, {
      expiresIn,
    });

    return { token, expiresIn: expiresIn + Date.now() };
  }

  verify<T = any>(token: string) {
    try {
      const payload = jwt.verify(token, this.secret) as TokenPayload<T>;

      if (payload.type !== TOKEN_TYPES.DELETE_ACCOUNT) {
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
