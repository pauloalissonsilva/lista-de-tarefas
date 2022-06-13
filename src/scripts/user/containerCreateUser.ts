import { CreateUserController } from "./CreateUserController.js";
import { CreateUserUseCase } from "./CreateUserUseCase.js";
import { UsersRepository } from "./UsersRepository.js";

const usersRepository = UsersRepository.getInstance();
const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }