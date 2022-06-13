import { ITasksRepository } from "./ITasksRepository.js"
import { Task } from "./Task.js"


interface IRequest {
  user_id: string;
}

class ListTaskUseCase {

  constructor(private taskRepository: ITasksRepository) { }

  async execute({ user_id }: IRequest): Promise<Task[]> {
    return await this.taskRepository.list(user_id)
  }

}

export { ListTaskUseCase }