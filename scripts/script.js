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
const galleryItemTemplate = document.querySelector('#gallery__item').content;
const galleryImgEl = document.querySelector('.gallery__image');

const modals = document.querySelectorAll('.modal');
const editProfileModal = document.querySelector('.modal_edit-profile');
const addPlaceModal = document.querySelector('.modal_add-new-place');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const addPlaceBtn = document.querySelector('.profile__add-btn');
const closeBtns = document.querySelectorAll('.modal__close-btn');
const forms = document.querySelectorAll('.modal__form');
const nameInput = document.querySelector('#modal__name');
const jobInput = document.querySelector('#modal__title');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');


const modalPlaceName = document.querySelector('#modal__place-name');
const modalPlaceImgLink = document.querySelector('#modal__place-img-link');

const render = (arr) => {
  arr.forEach((element) => {
    renderGalleryItems(element.name, element.link);
  })
};

const createGalleryItem = (itemTitle, itemImageLink) => {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
  const galleryImgEl = galleryItem.querySelector('.gallery__image');
  galleryItem.querySelector('.gallery__image-title').textContent = itemTitle;
  galleryImgEl.src = itemImageLink;
  galleryImgEl.alt = itemTitle;
  addListeners(galleryItem);
  return galleryItem;
};

const renderGalleryItems = (itemTitle, itemImageLink) => {
  const galleryItem = createGalleryItem(itemTitle, itemImageLink);
  gallery.appendChild(galleryItem);
};

const openImg = (e) => {
  openPopup(imageModal);
  modalImageSrc.src = e.target.src;
  modalImageSrc.alt = e.target.alt;
  modalImageCaption.textContent = e.target.alt;
};

const addListeners = (el) => {
  el.querySelector('.gallery__button').addEventListener('click', handleLike);
  el.querySelector('.gallery__delete-button').addEventListener('click', handleDelete);
  el.querySelector('.gallery__image').addEventListener('click', openImg);
};

const handleLike = (e) => {
  e.target.classList.toggle('gallery__button_active');
};

const handleDelete = (e) => {
  e.target.closest('.gallery__item').remove();
};

render(initialCards);

const openPopup = (modal) => {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeOnEsc);
}

const closePopup = (modal) => {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

const openEditProfileModal = () => {
  if (editProfileModal){
    openPopup(editProfileModal);
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


const editProfileForm = document.querySelector('form[name="edit-form"]');
const addPlaceForm = document.querySelector('form[name="add-form"]');

const imageModal = document.querySelector('.image-modal');
const imageModalContainer = document.querySelector('.image-modal__container');
const modalImageSrc = document.querySelector('.image-modal__img');
const modalImageCaption = document.querySelector('.image-modal__caption');
const modalImageCloseBtn = document.querySelector('.image-modal__close-icon');

const addSingleGalleryItem = (itemTitle, itemImageLink) => {
  const galleryItem = createGalleryItem(itemTitle, itemImageLink);
  gallery.prepend(galleryItem);
}

const addListenerToForm = (form, funcName) => {
  form.addEventListener('submit', funcName);
};

const handleEditProfileForm = (e) => {
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

const addPlaceFormSubmitButtons = document.querySelectorAll('.modal__submit');
const disableAddPlaceFormSubmitButton = () => {
  addPlaceFormSubmitButtons.forEach((button) => {
    button.setAttribute('disabled', true);
    button.classList.add('modal__submit_state_disabled');
  })
};

const handleAddPlaceForm = (e) => {
  e.preventDefault();
  addSingleGalleryItem(modalPlaceName.value, modalPlaceImgLink.value);
  closeModals();
  resetAddPlaceForm(modalPlaceName, modalPlaceImgLink);
  disableAddPlaceFormSubmitButton();
};

addListenerToForm(addPlaceForm, handleAddPlaceForm);

// закрываем модальные окна на клик по оверлею
modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.currentTarget === e.target) {
      closePopup(modal);
    }
  })
});

//закрываем попап с картинкой на клик по оверлею
imageModalContainer.addEventListener('click', (e) => {
  if (e.currentTarget === e.target) {
        closeModals();
      }
});

// функция закрытия на ESC
const closeOnEsc = (e) => {
  if (e.key === 'Escape') {
    closeModals();
  }
};
