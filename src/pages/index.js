import './index.css';
import { initialCards, gallery, modalEditProfile, modalAddPlace, profileEditBtn, placeAddBtn, nameInput, jobInput, profileName, profileTitle, imageModal, formEditProfile, formAddPlace, formObject } from '../utils/constants.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section} from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const formEditProfileValidator = new FormValidator(formObject, formEditProfile);
const formAddPlaceValidator = new FormValidator(formObject, formAddPlace);
formEditProfileValidator.enableValidation();
formAddPlaceValidator.enableValidation();

const modalWithImage = new PopupWithImage(imageModal);
modalWithImage.setEventListeners();

const createGalleryItem = (data) => {
  const card = new Card (data, '#gallery__item', (name, link) => modalWithImage.open(name, link));
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section({
  data: initialCards,
  renderer: (data) => {
    cardList.setItem(createGalleryItem(data));
  }
}, gallery);
cardList.renderItems();

const userObj = {
  userName: profileName,
  userInfo: profileTitle
}

const newUser = new UserInfo(userObj);

const addSingleGalleryItem = (data) => {
  const cardElement = createGalleryItem(data);
  cardList.addItem(cardElement);
}

const handleFormEditProfile = (data) => {
  data = {
    userName: data['user-name'],
    userInfo: data['user-title']
  }
  newUser.setUserInfo(data);
  modalWithFormEditProfile.close()
};

const handleFormAddPlace = (data) => {
  data = {
    name: data['place-name'],
    link: data['place-img-link']
  }
  addSingleGalleryItem(data);
  modalWithFormAddPlace.close();
};

const modalWithFormEditProfile = new PopupWithForm(modalEditProfile, handleFormEditProfile);
const modalWithFormAddPlace = new PopupWithForm(modalAddPlace, handleFormAddPlace);
modalWithFormEditProfile.setEventListeners();
modalWithFormAddPlace.setEventListeners();

const openEditProfileModal = () => {
    modalWithFormEditProfile.open()
    const data = newUser.getUserInfo();
    nameInput.value = data.userName.textContent;
    jobInput.value = data.userInfo.textContent;
};

const openModalAddPlace = () => {
    formAddPlaceValidator.toggleButtonState();
    modalWithFormAddPlace.open();
};

profileEditBtn.addEventListener('click', openEditProfileModal);
placeAddBtn.addEventListener('click', openModalAddPlace);

