import { CreateTaskController } from "./CreateTaskController.js";
import { CreateTaskUseCase } from "./CreateTaskUseCase.js";
import { TasksRepository } from "./TasksRepository.js";


const tasksRepository = TasksRepository.getInstance();
const createTaskUseCase = new CreateTaskUseCase(tasksRepository);
const createTaskController = new CreateTaskController(createTaskUseCase)

export { createTaskController }