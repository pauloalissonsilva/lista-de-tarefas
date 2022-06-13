import { ICreateUserDTO } from "./ICreateUserDTO.js";
import { User } from "./User.js";


export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}
