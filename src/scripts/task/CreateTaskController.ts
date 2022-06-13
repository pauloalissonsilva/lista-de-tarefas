import { CreateTaskUseCase } from "./CreateTaskUseCase.js";
import { ICreateTaskDTO } from "./ICreateTaskDTO.js";
import { Task } from "./Task.js";


export class CreateTaskController {

  constructor(private createTaskUseCase: CreateTaskUseCase) { }

  async handle(request: ICreateTaskDTO): Promise<Task> {
    const dataTask = request;

    const task = await this.createTaskUseCase.execute(dataTask);

    return task;
  }

}
