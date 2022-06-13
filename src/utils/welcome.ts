import { loadSessionStorage } from "./utilsLocalStorage.js";

export function welcome(): void {
  let title = document.querySelector<Element>("#welcome");
  const {username} = loadSessionStorage()

  title.textContent = `Olá! ${username}`

}