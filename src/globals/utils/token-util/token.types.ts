export type TokenType = keyof typeof TOKEN_TYPES;

export type PayloadType = string | number | Object;

export type TokenPayload<T = PayloadType> = {
  data: T;
  type: TokenType;
};

export type TokenOptions = {
  expiresIn?: number;
};

export interface ITokenUtility {
  create<T = any>(
    payload: T,
    options?: TokenOptions
  ): { token: string; expiresIn: number };
  verify<T = any>(token: string): T;
}

export type AuthTokenPayload = {
  email: string;
  id: string;
};

/** 1 hour */
export const _1_HOUR = 1000 * 60 * 60;

/** 1 week */
export const _1_WEEK = 1000 * 60 * 60 * 24 * 7;

export const TOKEN_TYPES = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  VERIFY_EMAIL: "VERIFY_EMAIL",
  DELETE_ACCOUNT: "DELETE_ACCOUNT",
} as const;
