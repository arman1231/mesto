import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js';

const initialCards = [
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
const gallery = document.querySelector('.gallery');

const modals = document.querySelectorAll('.modal');
const modalEditProfile = document.querySelector('.modal_edit-profile');
const addPlaceModal = document.querySelector('.modal_add-new-place');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const addPlaceBtn = document.querySelector('.profile__add-btn');
const closeBtns = document.querySelectorAll('.modal__close-btn');
const nameInput = document.querySelector('#modal__name');
const jobInput = document.querySelector('#modal__title');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');


const modalPlaceName = document.querySelector('#modal__place-name');
const modalPlaceImgLink = document.querySelector('#modal__place-img-link');

const editProfileForm = document.querySelector('form[name="edit-form"]');
const addPlaceForm = document.querySelector('form[name="add-form"]');
const formObject = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit',
  inactiveButtonClass: 'modal__submit_state_disabled',
  inputErrorClass: 'modal__input_state_error',
  errorClass: 'modal__input-error_active'
}

const editProfileFormValidator = new FormValidator(formObject, editProfileForm);
const addPlaceFormValidator = new FormValidator(formObject, addPlaceForm);
editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();

const render = (arr) => {
  arr.forEach((element) => {
    createGalleryItem(element);
    const cardElement = createGalleryItem(element);
    renderGalleryItems(cardElement);
  })
};
const createGalleryItem = (data) => {
  const card = new Card (data, '#gallery__item');
  const cardElement = card.generateCard();
  return cardElement;
};

const renderGalleryItems = (cardElement) => {
  gallery.append(cardElement);
};

render(initialCards);

export const openPopup = (modal) => {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeOnEsc);
}

const closePopup = (modal) => {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

const openEditProfileModal = () => {
  if (modalEditProfile){
    openPopup(modalEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;
  }
};

const openAddPlaceModal = () => {
  if (addPlaceModal){
    openPopup(addPlaceModal);
  }
};
const closeModals = () => {
  modals.forEach((modal) => {
    closePopup(modal);
  });
};

closeBtns.forEach((btn) => {
  btn.addEventListener('click', closeModals)
});
editProfileBtn.addEventListener('click', openEditProfileModal);
addPlaceBtn.addEventListener('click', openAddPlaceModal);

export const imageModal = document.querySelector('.image-modal');
export const modalImageSrc = document.querySelector('.image-modal__img');
export const modalImageCaption = document.querySelector('.image-modal__caption');

const addSingleGalleryItem = () => {
  const data = {
    name: modalPlaceName.value,
    link: modalPlaceImgLink.value
  }
  const cardElement = createGalleryItem(data);
  gallery.prepend(cardElement);
}

const addListenerToForm = (form, funcName) => {
  form.addEventListener('submit', funcName);
};

const handleEditProfileForm = (e) => {
  editProfileFormValidator.toggleButtonState();
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closeModals();
};
addListenerToForm(editProfileForm, handleEditProfileForm);

const resetAddPlaceForm = (placeName, placeImgLink) => {
  placeName.value = null;
  placeImgLink.value = null;
};


const handleAddPlaceForm = (e) => {
  e.preventDefault();
  addSingleGalleryItem();
  closeModals();
  resetAddPlaceForm(modalPlaceName, modalPlaceImgLink);
  addPlaceFormValidator.toggleButtonState();
};

addListenerToForm(addPlaceForm, handleAddPlaceForm);

// закрываем модальные окна на клик по оверлею
modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.currentTarget === e.target) {
      closeModals();
    }
  })
});


// функция закрытия на ESC
const closeOnEsc = (e) => {
  if (e.key === 'Escape') {
    closeModals();
  }
};
