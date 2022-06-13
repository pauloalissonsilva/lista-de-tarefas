import { deleteItem, loadLocalStorage, saveLocalStorage } from "../../utils/utilsLocalStorage.js";
import { ICreateTaskDTO } from "./ICreateTaskDTO.js";
import { ITasksRepository } from "./ITasksRepository.js";
import { Task } from "./Task.js"

class TasksRepository implements ITasksRepository {
  private tasks: Task[];
  private static INSTANCE: TasksRepository;
  private KEYDB = '@CreedTech:tasks';

  constructor() {
    this.tasks = loadLocalStorage(this.KEYDB);
  }

  public static getInstance(): TasksRepository {
    if (!TasksRepository.INSTANCE) {
      TasksRepository.INSTANCE = new TasksRepository()
    }
    return TasksRepository.INSTANCE
  }

  async create(dataTask: ICreateTaskDTO): Promise<Task> {
    const task = new Task();
  

    Object.assign(task, dataTask);

    this.tasks = saveLocalStorage(task, this.KEYDB);

    return task;
  }

  async findById(task_id: string): Promise<Task> {
    return this.tasks.find(task => task.id === task_id);
  }

  async filter(title?: string, description?: string): Promise<Task[]> {
    return this.tasks.filter(task => {
      if (title || description) {
        if ((title && task.title === title) || (description && task.description === description)) {
          return task
        }
      } else {
        return task
      }
      return null
    });
  }

  async list(user_id: string): Promise<Task[]> {
    return this.tasks.filter(task => task.user_id === user_id)
  }

  async delete(task_id: string): Promise<void> {
    deleteItem(task_id, this.KEYDB);
    this.tasks = loadLocalStorage(this.KEYDB);
  }

}

export { TasksRepository }
