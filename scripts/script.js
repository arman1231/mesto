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

const modals = document.querySelectorAll('.modal');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const addPlaceBtn = document.querySelector('.profile__add-btn');
const formSubmits = document.querySelectorAll('.modal__submit');
const closeBtns = document.querySelectorAll('.modal__close-btn');
const forms = document.querySelectorAll('.modal__form');
let nameInput = document.querySelector('#modal__name');
let jobInput = document.querySelector('#modal__title');
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');

let modalPlaceName = document.querySelector('#modal__place-name');
let modalPlaceImgLink = document.querySelector('#modal__place-img-link');



const render = (arr) => {
  arr.forEach((element) => {
    renderGalleryItems(element.name, element.link);
  })
};

const renderGalleryItems = (itemTitle, itemImageLink) => {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
  galleryItem.querySelector('.gallery__image-title').textContent = itemTitle;
  galleryItem.querySelector('.gallery__image').src = itemImageLink;
  galleryItem.querySelector('.gallery__image').alt = itemTitle;
  addListeners(galleryItem);
  gallery.appendChild(galleryItem);
};

const addListeners = (el) => {
  el.querySelector('.gallery__button').addEventListener('click', handleLike);
  el.querySelector('.gallery__delete-button').addEventListener('click', handleDelete);
};

const handleLike = (e) => {
  e.target.classList.toggle('gallery__button_active');
};

const handleDelete = (e) => {
  e.target.closest('.gallery__item').remove();
};

render(initialCards);

const openEditProfileModal = () => {
  modals.forEach((modal) => {
    if (modal.classList.contains('modal_edit-profile')){
      modal.classList.add('modal_opened');
      nameInput.value = profileName.textContent;
      jobInput.value = profileTitle.textContent;
    }
  });

};
const openAddPlaceModal = () => {
  modals.forEach((modal) => {
    if (modal.classList.contains('modal_add-new-place')){
      modal.classList.add('modal_opened');
    }
  })

};
const closeModal = () => {
  modals.forEach((modal) => {
    modal.classList.remove('modal_opened');
  })

};

closeBtns.forEach((btn) => {
  btn.addEventListener('click', closeModal)
});
editProfileBtn.addEventListener('click', openEditProfileModal);
addPlaceBtn.addEventListener('click', openAddPlaceModal);

// modal.addEventListener('click', (e) => {
//   if (e.currentTarget === e.target) {
//     modal.classList.remove('modal_opened');
//   }
// });

const imageModal = document.querySelector('.image-modal');
const galleryImages = document.querySelectorAll('.gallery__image');
const modalImageSrc = document.querySelector('.image-modal__img');
const modalImageCaption = document.querySelector('.image-modal__caption');
const modalImageCloseBtn = document.querySelector('.image-modal__close-icon');

const addSingleGalleryItem = (itemTitle, itemImageLink) => {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__item').cloneNode(true);
  galleryItem.querySelector('.gallery__image-title').textContent = itemTitle;
  galleryItem.querySelector('.gallery__image').src = itemImageLink;
  galleryItem.querySelector('.gallery__image').alt = itemTitle;
  addListeners(galleryItem);
  gallery.prepend(galleryItem);
}

const formSubmitHandler = (e) => {
  e.preventDefault();
  if (e.target.name === 'edit-form') {
    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;
  } else if (e.target.name === 'add-form') {
    addSingleGalleryItem(modalPlaceName.value, modalPlaceImgLink.value);
  }
  closeModal();
};

forms.forEach((form) => {
  form.addEventListener('submit', formSubmitHandler);
})

const openImg = (e) => {
  imageModal.classList.add('image-modal_opened');
  modalImageSrc.src = e.target.src;
  modalImageSrc.alt = e.target.alt;
  modalImageCaption.textContent = e.target.nextElementSibling.children[0].textContent;
}

galleryImages.forEach((el) => {
  el.addEventListener('click', openImg);
});

const closeImageModal = () => {
  imageModal.classList.remove('image-modal_opened');
}
modalImageCloseBtn.addEventListener('click', closeImageModal);
