import './index.css';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section} from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

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

const modalEditProfile = document.querySelector('.modal_edit-profile');
const modalAddPlace = document.querySelector('.modal_add-new-place');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const placeAddBtn = document.querySelector('.profile__add-btn');
const nameInput = document.querySelector('#modal__name');
const jobInput = document.querySelector('#modal__title');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const imageModal = document.querySelector('.image-modal');

const formEditProfile = document.querySelector('form[name="edit-form"]');
const formAddPlace = document.querySelector('form[name="add-form"]');
const formObject = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit',
  inactiveButtonClass: 'modal__submit_state_disabled',
  inputErrorClass: 'modal__input_state_error',
  errorClass: 'modal__input-error_active'
}

const formEditProfileValidator = new FormValidator(formObject, formEditProfile);
const formAddPlaceValidator = new FormValidator(formObject, formAddPlace);
formEditProfileValidator.enableValidation();
formAddPlaceValidator.enableValidation();

const modalWithImage = new PopupWithImage(imageModal);

const cardList = new Section({
  data: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#gallery__item', (name, link) => modalWithImage.open(name, link));
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, gallery);
cardList.renderItems();

const createGalleryItem = (data) => {
  const card = new Card (data, '#gallery__item', (name, link) => modalWithImage.open(name, link));
  const cardElement = card.generateCard();
  return cardElement;
};

const userObj = {
  userName: profileName,
  userInfo: profileTitle
}
const newUser = new UserInfo(userObj);

const addSingleGalleryItem = (data) => {
  const cardElement = createGalleryItem(data);
  cardList.addItem(cardElement);
}

const handleFormEditProfile = () => {
  formEditProfileValidator.toggleButtonState();
  const newUserData = {
    userName: nameInput.value,
    userInfo: jobInput.value
  }
  newUser.setUserInfo(newUserData);
  modalWithFormEditProfile.close()
};

const handleFormAddPlace = (data) => {
  data = {
    name: data['place-name'],
    link: data['place-img-link']
  }
  addSingleGalleryItem(data);
  modalWithFormAddPlace.close();
  formAddPlaceValidator.toggleButtonState();
};

const modalWithFormEditProfile = new PopupWithForm(modalEditProfile, handleFormEditProfile);
const modalWithFormAddPlace = new PopupWithForm(modalAddPlace, handleFormAddPlace);

const openEditProfileModal = () => {
    modalWithFormEditProfile.open()
    nameInput.value = newUser.getUserInfo().userName.textContent;
    jobInput.value = newUser.getUserInfo().userInfo.textContent;
    modalWithFormEditProfile.setEventListeners(formEditProfile);
};

const openModalAddPlace = () => {
    modalWithFormAddPlace.open();
    modalWithFormAddPlace.setEventListeners(formAddPlace);
};

profileEditBtn.addEventListener('click', openEditProfileModal);
placeAddBtn.addEventListener('click', openModalAddPlace);

