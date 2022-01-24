const modal = document.querySelector(".modal");
const openBtn = document.querySelector(".profile__edit-btn");
const formSubmit = document.querySelector(".modal__submit");
const closeBtn = document.querySelector(".modal__close-btn");
const form = document.querySelector(".modal__form");
let nameInput = document.querySelector("#modal__name");
let jobInput = document.querySelector("#modal__title");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

const openModal = () => {
  modal.classList.add("modal_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileTitle.textContent;
};
const closeModal = () => {
  modal.classList.remove("modal_opened");
};
openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
// modal.addEventListener("click", (e) => {
//   if (e.currentTarget === e.target) {
//     modal.classList.remove("modal_opened");
//   }
// });
const formSubmitHandler = (e) => {
  e.preventDefault();

  profileName.textContent += profileName.textContent;
  profileTitle.textContent += profileTitle.textContent;
  closeModal();
};
form.addEventListener("submit", formSubmitHandler);
