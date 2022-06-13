
const sign_in_btn = document.querySelector<HTMLButtonElement>("#sign-in-btn");
const sign_up_btn = document.querySelector<HTMLButtonElement>("#sign-up-btn");
const container = document.querySelector<HTMLDivElement>(".container-main");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

