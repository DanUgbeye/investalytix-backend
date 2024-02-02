import { Router } from "express";
import authMiddleware from "./auth.middleware";
import validateRequest from "../../../globals/middlewares/validator.middleware";
import { RouterInterface } from "src/types/router.types";
import authController from "./auth.controller";

export default class AuthRouter implements RouterInterface {
  private static instance: AuthRouter | null = null;
  public router: Router;
  public BASE_PATH = "/auth" as const;

  constructor() {
    if (AuthRouter.instance) {
      throw new Error("Auth Router Instance already exists");
    }

    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.router.post("/login", validateRequest({}), authController.login);

    this.router.post("/signup", validateRequest({}), authController.signup);

    this.router.get("/verify-email/:token", authController.verifyEmail);

    this.router.post(
      "/verify-email/resend",
      authMiddleware.authenticateUser(),
      authController.verifyEmail
    );

    this.router.post(
      "/forgot-password",
      validateRequest({}),
      authController.forgotPassword
    );

    this.router.post(
      "/forgot-password/:token",
      validateRequest({}),
      authController.resetPassword
    );
  }

  /** single instance of AuthRouter */
  static bootstrap() {
    if (AuthRouter.instance) {
      return AuthRouter.instance;
    }

    AuthRouter.instance = new AuthRouter();
    return AuthRouter.instance;
  }
}
