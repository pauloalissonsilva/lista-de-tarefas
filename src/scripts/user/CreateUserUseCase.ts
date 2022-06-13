import { User } from "./User.js";
import { IUsersRepository } from "./IUsersRepository.js";

interface IRequest {
  username: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {

  constructor(private usersRepository: IUsersRepository) { }

  async execute({ username, email, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.create({ username, email, password });

    return user;
  }

}
