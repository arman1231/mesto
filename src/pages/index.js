import './index.css';
import { initialCards, gallery, modalEditProfile, modalAddPlace, profileEditBtn, placeAddBtn, nameInput, jobInput, profileName, profileTitle, imageModal, formEditProfile, formAddPlace, formObject, modalConfirmDelete, formEditAvatar, avatarEditBtn, modalEditAvatar, buttonSubmit} from '../utils/constants.js'
import { api } from '../components/Api.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section} from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';


const renderLoading = (isLoading) => {
  if (isLoading) {
    buttonSubmit.textContent = 'Сохранение...';
  } else {
    buttonSubmit.textContent = 'Сохранить';
  }
};

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
    avatarEditBtn.style.backgroundImage = `url(${res[0].avatar})`;
    userId = res[0]._id;
    newUser.setUserInfo(res[0])

    const cardList = new Section({
      data: res[1],
      renderer: (data) => {
        cardList.setItem(createGalleryItem(data));
      }
    }, gallery);
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
})

let userId;

// api.getUserInfo().then((res) => {
//   res = {
//     userName: res['name'],
//     userInfo: res['about'],
//     _id: res._id,
//     avatar: res.avatar
//   }
//   avatarEditBtn.style.backgroundImage = `url(${res.avatar})`;
//   userId = res._id;
//   newUser.setUserInfo(res)
// })


// api.getInitialCards().then((res) => {
//   const cardList = new Section({
//     data: res,
//     renderer: (data) => {
//       cardList.setItem(createGalleryItem(data));
//     }
//   }, gallery);
//   cardList.renderItems();
// })

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
      api.deleteCard(`${id}`);
      card.removeFromPage();
      modalWithConfirmDelete.close();
    })
  },
  (id) => {
    if (card.isLiked()) {
      api.removeLike(id).then(res => {
        card.handleLike(res.likes)})
    } else {
      api.setLike(id).then(res => {
        card.handleLike(res.likes)})
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
  renderLoading(true);
  data = {
    userName: data['user-name'],
    userInfo: data['user-title']
  }
  newUser.setUserInfo(data);
  api.setUserInfo(data).finally(() => {
    renderLoading(false);
  });
  modalWithFormEditProfile.close()
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
  addSingleGalleryItem(data);
  api.addNewCard(data).finally(() => {
    renderLoading(false);
  });
  modalWithFormAddPlace.close();
};

const handleFormEditAvatar = (data) => {
  renderLoading(true);
  api.updateAvatar(data.avatar).finally(() => {
    renderLoading(false);
  });
  avatarEditBtn.style.backgroundImage = `url(${data.avatar})`;
  modalWithEditAvatar.close();
}

const modalWithFormEditProfile = new PopupWithForm(modalEditProfile, handleFormEditProfile);
const modalWithFormAddPlace = new PopupWithForm(modalAddPlace, handleFormAddPlace);
const modalWithConfirmDelete = new PopupWithForm(modalConfirmDelete);
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
  modalWithEditAvatar.open();
}
profileEditBtn.addEventListener('click', openEditProfileModal);
placeAddBtn.addEventListener('click', openModalAddPlace);
avatarEditBtn.addEventListener('click', openEditAvatar);
