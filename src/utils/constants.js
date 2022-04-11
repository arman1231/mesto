export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
export const gallery = document.querySelector('.gallery');
export const modalEditProfile = document.querySelector('.modal_edit-profile');
export const modalAddPlace = document.querySelector('.modal_add-new-place');
export const modalConfirmDelete = document.querySelector('.modal_confirm-delete');
export const modalEditAvatar = document.querySelector('.modal_edit-avatar');
export const buttonSubmit = document.querySelector('.modal__submit');
export const buttonDelete = document.querySelector('.gallery__delete-button');
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const placeAddBtn = document.querySelector('.profile__add-btn');
export const avatarEditBtn = document.querySelector('.profile__edit-user-image-button');
export const nameInput = document.querySelector('#modal__name');
export const jobInput = document.querySelector('#modal__title');
export const profileName = document.querySelector('.profile__name');
export const profileTitle = document.querySelector('.profile__title');

export const imageModal = document.querySelector('.image-modal');

export const formEditProfile = document.querySelector('form[name="edit-form"]');
export const formAddPlace = document.querySelector('form[name="add-form"]');
export const formDeletePlace = document.querySelector('form[name="delete-form"]');
export const formEditAvatar = document.querySelector('form[name="update-avatar-form"]');
export const formObject = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit',
  inactiveButtonClass: 'modal__submit_state_disabled',
  inputErrorClass: 'modal__input_state_error',
  errorClass: 'modal__input-error_active'
}
