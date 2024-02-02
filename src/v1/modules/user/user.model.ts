import { UserData } from "./user.types";

export class UserModel {
  async create(data: UserData) {}

  async findAll() {}

  async findById(id: string) {}

  async update(id: string, data: Partial<UserData>) {}

  async delete(id: string) {}
}

const userModel = new UserModel();

export default userModel;
