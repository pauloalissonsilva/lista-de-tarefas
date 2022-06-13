import { createUserController } from "./containerCreateUser.js";

interface IRequest {
  username: string;
  email: string;
  password: string;
}

document.querySelector(".sign-up-form").addEventListener("submit", (event: Event) => {
  event.preventDefault()
  createUser()
})

function formattedUser(): IRequest {
  const userForm = document.querySelectorAll(".sign-up-form input") as NodeListOf<HTMLInputElement>;
  const newUser = {} as IRequest

  userForm.forEach(data => {
    if (data.value === "Cadastrar") {
      return;
    }
    newUser[data.name] = data.value
  })

  return newUser
}

async function createUser(): Promise<void> {
  try {
    const { username, email, password } = formattedUser()
  
    await createUserController.handle({ username, email, password });
  
    setTimeout(function () {
      window.location.href = "src/pages/dashboard.html";
    }, 5000);

  } catch (error) {
    console.log(error)
  }
   

}

