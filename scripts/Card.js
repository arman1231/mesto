import {openPopup, modalImageSrc, modalImageCaption, imageModal} from './script.js'

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const galleryItem = document.querySelector(this._templateSelector).content.querySelector('.gallery__item').cloneNode(true);
    return galleryItem;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._addListeners();

    this._element.querySelector('.gallery__image-title').textContent = this._name;
    this._element.querySelector('.gallery__image').src = this._link;
    this._element.querySelector('.gallery__image').alt = this._name;

    return this._element;
  }
  _handleLike() {
    this._element.querySelector('.gallery__button').classList.toggle('gallery__button_active');
  }
  _handleDelete() {
    this._element.querySelector('.gallery__delete-button').closest('.gallery__item').remove();
  }
  _openImg() {
    modalImageSrc.src = this._link;
    modalImageSrc.alt = this._name;
    modalImageCaption.textContent = this._name;
    openPopup(imageModal);
  }
  _addListeners() {
    this._element.querySelector('.gallery__button').addEventListener('click', () => this._handleLike());
    this._element.querySelector('.gallery__delete-button').addEventListener('click', () => this._handleDelete());
    this._element.querySelector('.gallery__image').addEventListener('click', () => this._openImg());
  }
}
