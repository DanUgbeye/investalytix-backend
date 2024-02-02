import { UserData } from "./user.types";

export class UserRepository {
  constructor() {}

  async create(data: Partial<UserData>) {}

  async findById(id: string) {}

  async find(filter: any) {}

  async update(id: string, data: Partial<UserData>) {}

  async delete(id: string) {}
}

const userRepository = new UserRepository();
export default userRepository;
