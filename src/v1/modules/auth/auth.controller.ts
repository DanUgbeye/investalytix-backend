import { Request, Response } from "express";
import serverResponse from "../../../globals/helpers/server-response";

export class StaffController {
  /**
   * user login
   * @path POST - ../v1/auth/login
   */
  async login(req: Request<any, any, any, any>, res: Response) {
    return serverResponse.success(res, "login ");
  }

  /**
   * user signup
   * @path POST - ../v1/auth/signup
   */
  async signup(req: Request<any, any, any, any>, res: Response) {
    return serverResponse.success(res, "signup");
  }

  /**
   * verify user email
   * @path POST - ../v1/auth/verify-email/:token
   */
  async verifyEmail(req: Request<any, any, any, any>, res: Response) {
    return serverResponse.success(res, "verify user email");
  }

  /**
   * resend verification email
   * @path POST - ../v1/auth/verify-email/resend
   */
  async resendVerificationEmail(
    req: Request<any, any, any, any>,
    res: Response
  ) {
    return serverResponse.success(res, "resend verification email");
  }

  /**
   * send forgot password email
   * @path POST - ../v1/auth/forgot-password
   */
  async forgotPassword(req: Request<any, any, any, any>, res: Response) {
    return serverResponse.success(res, "forgot password");
  }

  /**
   * send forgot password email
   * @path POST - ../v1/auth/forgot-password/:token
   */
  async resetPassword(req: Request<any, any, any, any>, res: Response) {
    return serverResponse.success(res, "reset password");
  }
}

const authController = new StaffController();

export default authController;
