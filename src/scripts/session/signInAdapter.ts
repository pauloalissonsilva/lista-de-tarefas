import { saveSessionStorage } from "../../utils/utilsLocalStorage.js";
import { UsersRepository } from "../user/UsersRepository.js";
import { alert } from "../../utils/alert.js"

document.querySelector(".sign-in-form").addEventListener("submit", event => {
  event.preventDefault()
  goToDashboard()
})

async function goToDashboard() {
  const usersRepository = UsersRepository.getInstance();
  const email = document.querySelector<HTMLInputElement>("#email")?.value;
  const password = document.querySelector<HTMLInputElement>("#password")?.value;

  const user = await usersRepository.findByEmail(email)

  if (!user) {
    alert("Senha ou email incorretos", { type: "info" })
    return;
  }

  if (password !== user.password || email !== user.email) {
    alert("Senha ou email incorretos", { type: "info" })
    return;
  }

  saveSessionStorage({
    id: user.id,
    username: user.username
  })

  setTimeout(function () {
    window.location.href = "src/pages/dashboard.html";
  }, 3000);

}



