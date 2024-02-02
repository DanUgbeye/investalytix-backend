import express from "express";
import AuthRouter from "./modules/auth/auth.routes";
import UserRouter from "./modules/user/user.routes";
import ServerResponse from "src/globals/helpers/server-response";

const V1_ROUTES = express.Router();
const authRouter = AuthRouter.bootstrap();
const userRouter = UserRouter.bootstrap();

V1_ROUTES.get("/", (req, res) => {
  ServerResponse.success(res, "⚡ V1 up and running ⚡");
});

V1_ROUTES.use(authRouter.BASE_PATH, authRouter.router);
V1_ROUTES.use(userRouter.BASE_PATH, userRouter.router);

export default V1_ROUTES;
