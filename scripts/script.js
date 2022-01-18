const modal = document.querySelector(".modal");
const openBtn = document.querySelector(".profile__edit-btn");
const formSubmit = document.querySelector(".modal__submit");
const closeBtn = document.querySelector(".modal__close-btn");
const form = document.querySelector(".modal__form");
let nameInput = document.querySelector("#modal__name");
let jobInput = document.querySelector("#modal__title");

openBtn.addEventListener("click", () => {
  modal.classList.add("modal_opnd");
});
closeBtn.addEventListener("click", () => {
  modal.classList.remove("modal_opnd");
});
modal.addEventListener("click", (e) => {
  if (e.currentTarget === e.target) {
    modal.classList.remove("modal_opnd");
  }
});

const formSubmitHandler = (e) => {
  e.preventDefault();
  let nameInputVal = nameInput.value;
  let jobInputVal = jobInput.value;
  let profileName = document.querySelector(".profile__name");
  let profileTitle = document.querySelector(".profile__title");
  profileName.textContent = nameInputVal;
  profileTitle.textContent = jobInputVal;
  modal.classList.remove("modal_opnd");
};
form.addEventListener("submit", formSubmitHandler);
