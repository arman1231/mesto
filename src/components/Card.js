export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const galleryItem = document.querySelector(this._templateSelector).content.querySelector('.gallery__item').cloneNode(true);
    return galleryItem;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.gallery__image');
    this._galleryLikeButton = this._element.querySelector('.gallery__button');
    this._addListeners();

    this._element.querySelector('.gallery__image-title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }
  _handleLike() {
    this._galleryLikeButton.classList.toggle('gallery__button_active');
  }
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
  _addListeners() {
    this._galleryLikeButton.addEventListener('click', () => this._handleLike());
    this._element.querySelector('.gallery__delete-button').addEventListener('click', () => this._handleDelete());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}
