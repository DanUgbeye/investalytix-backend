import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import validateRequest from "../../../globals/middlewares/validator.middleware";
import { RouterInterface } from "src/types/router.types";
import userController from "./user.controller";

export default class UserRouter implements RouterInterface {
  private static instance: UserRouter | null = null;
  public router: Router;
  public BASE_PATH = "/user" as const;

  constructor() {
    if (UserRouter.instance) {
      throw new Error("User Router Instance already exists");
    }

    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes() {
    // get all user route
    this.router.get(
      "/",
      authMiddleware.authenticateUser(),
      userController.findAll
    );

    // get user by id route
    this.router.get(
      "/:id",
      authMiddleware.authenticateUser(),
      userController.findById
    );

    // update user route
    this.router.patch(
      "/:id",
      authMiddleware.authenticateUser(),
      validateRequest({}),
      userController.update
    );
  }

  /** single instance of UserRouter */
  static bootstrap() {
    if (UserRouter.instance) {
      return UserRouter.instance;
    }

    UserRouter.instance = new UserRouter();
    return UserRouter.instance;
  }
}
