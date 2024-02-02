class ServerConfig {
  public readonly PORT: number;
  /** Mongo DB connection string */
  public readonly DB_URI: string;

  /** access token secret for signing JWt tokens */
  public readonly ACCESS_TOKEN_SECRET: string;
  /** refresh token secret for signing JWt tokens */
  public readonly REFRESH_TOKEN_SECRET: string;

  /** server url */
  public readonly SERVER_BASE_URL: string;
  /** server url */
  public readonly CLIENT_BASE_URL: string;

  constructor(env: any) {
    this.PORT = env.PORT ? Number(env.PORT) : 5000;
    this.DB_URI = env.DB_URI as string;
    this.ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET as string;
    this.REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET as string;
    this.SERVER_BASE_URL = env.SERVER_BASE_URL as string;
    this.CLIENT_BASE_URL = env.CLIENT_BASE_URL as string;
  }
}

const SERVER_CONFIG = new ServerConfig(process.env);

export default SERVER_CONFIG;
