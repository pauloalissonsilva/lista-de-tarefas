import { ListTaskController } from "./ListTaskController.js";
import { ListTaskUseCase } from "./ListTaskUseCase.js";
import { TasksRepository } from "./TasksRepository.js";


const tasksRepository = TasksRepository.getInstance();
const listTaskUseCase = new ListTaskUseCase(tasksRepository);
const listTaskController = new ListTaskController(listTaskUseCase)

export { listTaskController }