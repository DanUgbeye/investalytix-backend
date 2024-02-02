import { Request, Response } from "express";
import serverResponse from "../../../globals/helpers/server-response";

export class UserController {
  /**
   * update user profile
   * @path PATCH - ../v1/user/
   */
  async update(req: Request<any, any, any, any>, res: Response) {
    return serverResponse.success(res, "update user ");
  }

  /** get user using id */
  async findById(req: Request<any, any, any, any>, res: Response) {
    return serverResponse.success(res, "get user by id");
  }

  /** get all user */
  async findAll(req: Request<any, any, any, any>, res: Response) {
    return serverResponse.success(res, "get all users");
  }
}

const userController = new UserController();

export default userController;
