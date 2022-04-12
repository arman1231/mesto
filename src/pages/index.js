import './index.css';
import { initialCards, gallery, modalEditProfile, modalAddPlace, profileEditBtn, placeAddBtn, nameInput, jobInput, profileName, profileTitle, imageModal, formEditProfile, formAddPlace, formObject, modalConfirmDelete, formEditAvatar, avatarEditBtn, modalEditAvatar, buttonsSubmit} from '../utils/constants.js'
import { api } from '../components/Api.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section} from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';


const renderLoading = (isLoading) => {
  if (isLoading) {
    buttonsSubmit.forEach((el) => {
      el.textContent = 'Сохранение...';
    });
  } else {
    buttonsSubmit.forEach((el) => {
      el.textContent = 'Сохранить';
    });
  }
};
let userId;
const userObj = {
  userName: profileName,
  userInfo: profileTitle,
  avatar: avatarEditBtn
}

const newUser = new UserInfo(userObj);

const getUserInfoPromise = api.getUserInfo();
const getInitialCardsPromise = api.getInitialCards();

Promise.all([getUserInfoPromise, getInitialCardsPromise])
  .then((res) => {
    res[0] = {
      userName: res[0]['name'],
      userInfo: res[0]['about'],
      _id: res[0]._id,
      avatar: res[0].avatar
    }
    userId = res[0]._id;
    newUser.setUserInfo(res[0])
    newUser.setUserAvatar(res[0])


    cardList.renderItems(res[1]);
  })
  .catch((error) => console.log(error))

const formEditProfileValidator = new FormValidator(formObject, formEditProfile);
const formAddPlaceValidator = new FormValidator(formObject, formAddPlace);
const formEditAvatarValidator = new FormValidator(formObject, formEditAvatar);
formEditProfileValidator.enableValidation();
formAddPlaceValidator.enableValidation();
formEditAvatarValidator.enableValidation();

const modalWithImage = new PopupWithImage(imageModal);
modalWithImage.setEventListeners();

const createGalleryItem = (data) => {
  const card = new Card (userId, data, '#gallery__item',
  (name, link) => modalWithImage.open(name, link),
  (id) => {
    modalWithConfirmDelete.open();
    modalWithConfirmDelete.alternateSubmit(() => {
      api.deleteCard(`${id}`)
      .then(() => {

        card.removeFromPage();
        modalWithConfirmDelete.close();
      })
      .catch((error) => console.log(error));
    })
  },
  (id) => {
    if (card.isLiked()) {
      api.removeLike(id).then(res => {
        card.handleLike(res.likes)}).catch((error) => console.log(error))
    } else {
      api.setLike(id).then(res => {
        card.handleLike(res.likes)}).catch((error) => console.log(error))
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section({
  data: [],
  renderer: (data) => {
    cardList.setItem(createGalleryItem(data));
  }
}, gallery);

const addSingleGalleryItem = (data) => {
  const cardElement = createGalleryItem(data);
  cardList.addItem(cardElement);
}

const handleFormEditProfile = (data) => {
  renderLoading(true);
  data = {
    userName: data['user-name'],
    userInfo: data['user-title']
  }
  api.setUserInfo(data)
  .then(() => {
    newUser.setUserInfo(data);
    modalWithFormEditProfile.close();
  })
  .catch((error) => console.log(error))
  .finally(() => {
    renderLoading(false);
  });
};

const handleFormAddPlace = (data) => {
  renderLoading(true);
  data = {
    owner: {
      _id: userId
    },
    _id: data._id,
    name: data['place-name'],
    link: data['place-img-link'],
    likes: [],
  }
  api.addNewCard(data)
  .then((res) => {
    addSingleGalleryItem(res);
    modalWithFormAddPlace.close();
  })
  .catch((error) => console.log(error))
  .finally(() => {
    renderLoading(false);
  });
};

const handleFormEditAvatar = (data) => {
  renderLoading(true);
  api.updateAvatar(data.avatar)
  .then(() => {
    // avatarEditBtn.style.backgroundImage = `url(${data.avatar})`;
    newUser.setUserAvatar(data)
    modalWithEditAvatar.close();
  }).catch((error) => console.log(error))
  .finally(() => {
    renderLoading(false);
  });
}

const modalWithFormEditProfile = new PopupWithForm(modalEditProfile, handleFormEditProfile);
const modalWithFormAddPlace = new PopupWithForm(modalAddPlace, handleFormAddPlace);
const modalWithConfirmDelete = new PopupWithConfirm(modalConfirmDelete);
const modalWithEditAvatar = new PopupWithForm(modalEditAvatar, handleFormEditAvatar);
modalWithFormEditProfile.setEventListeners();
modalWithFormAddPlace.setEventListeners();
modalWithConfirmDelete.setEventListeners();
modalWithEditAvatar.setEventListeners();

const openEditProfileModal = () => {
    modalWithFormEditProfile.open();
    const data = newUser.getUserInfo();
    nameInput.value = data.userName;
    jobInput.value = data.userInfo;
};

const openModalAddPlace = () => {
    formAddPlaceValidator.toggleButtonState();
    modalWithFormAddPlace.open();
};

const openEditAvatar = () => {
  formEditAvatarValidator.toggleButtonState();
  modalWithEditAvatar.open();
}
profileEditBtn.addEventListener('click', openEditProfileModal);
placeAddBtn.addEventListener('click', openModalAddPlace);
avatarEditBtn.addEventListener('click', openEditAvatar);
