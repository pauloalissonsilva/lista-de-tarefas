import { loadSessionStorage } from "../../utils/utilsLocalStorage.js"
import { ICreateTaskDTO } from "./ICreateTaskDTO.js";
import { listTaskController } from "./containerListTask.js";
import { createTaskController } from "./containerCreateTask.js";

import { welcome } from "../../utils/welcome.js";
import { alert } from "../../utils/alert.js"
import { TasksRepository } from "./TasksRepository.js";

async function createTask(): Promise<void> {
  const { id: user_id } = loadSessionStorage();
  const task = document.querySelector<HTMLInputElement>(".modal-body");
  let title = document.querySelector<HTMLInputElement>("#titleTask")
  let description = document.querySelector<HTMLTextAreaElement>("#descriptionTask");

  if (!user_id) {
    alert("Algo saiu errado faça login!", { type: "danger" })
    return;
  }

  if (task.id !== "") {
    await createTaskController.handle({ id: task.id, user_id, title: title?.value, description: description?.value });

    await loadTasks();

    alert("Sua tarefa foi atualizada com sucesso!", { type: "success" }, ".modal-body");
    
    title.value = ""
    description.value = ""
    task.removeAttribute("id");
    return;
  }

  await createTaskController.handle({ user_id, title: title?.value, description: description?.value });

  alert("Sua tarefa foi criada com sucesso!", { type: "success" }, ".modal-body");

  await loadTasks()

  title.value = ""
  description.value = ""
}

async function editTask(id: string): Promise<void> {
  const { id: user_id } = loadSessionStorage();

  const tasks = await listTaskController.handle({ user_id });

  const task = tasks.find(task => task.id === id);

  setDataModal(task)

}

async function deleteTask(id:string) {
  const repo = TasksRepository.getInstance()
  repo.delete(id)
}

async function loadTasks(): Promise<void> {
  const { id: user_id } = loadSessionStorage()
  let trTable = document.querySelector<HTMLTableElement>("#tasks");

  trTable.innerHTML = ""

  const tasks = await listTaskController.handle({ user_id })

  tasks.map(task => {
    trTable.innerHTML += createTaskOnTable(task)
  })
}

function setDataModal(task: ICreateTaskDTO): void {
  let title = document.querySelector<HTMLInputElement>("#titleTask")
  let description = document.querySelector<HTMLTextAreaElement>("#descriptionTask");
  const task_id = document.querySelector<HTMLInputElement>(".modal-body")

  task_id.setAttribute("id", task.id);

  title.value = task.title
  description.value = task.description
}

function createTaskOnTable(task: ICreateTaskDTO): string {
  return `
    <tr id="${task.id}">
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>
        <div class="d-grid gap-2 text-center d-md-block">
          <button id="delete_${task.id}" class="btn-actions btn btn-danger" type="button">Delete</button>
          <button id="edit_${task.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn-actions btn btn-success" type="button">Editar</button>
        </div>
      </td>
    </tr>
  `
}
async function find() {
  
}
async function captureAction(event: any): Promise<void> {
  if (event.target.type === 'button') {

    const [action, id] = event.target.id.split('_')

    if (action == 'edit') {
      editTask(id)
    } else {
      const { id: user_id } = loadSessionStorage()

      const tasks = await listTaskController.handle({ user_id });

      const response = confirm("Deseja realmente excluir?");

      if (response) {
        deleteTask(id)
        loadTasks()
      }
    }
  }
}

document.querySelector<HTMLButtonElement>("#newTask").addEventListener("click", () => {
document.querySelector<HTMLButtonElement>("#btnSave").addEventListener("click", createTask);
  const task_id = document.querySelector<HTMLInputElement>(".modal-body")
  task_id?.removeAttribute("id");
});

document.querySelector<HTMLButtonElement>("#tasks")?.addEventListener("click", captureAction);

window.addEventListener("load", async () => {
  await loadTasks()
  welcome()
});

