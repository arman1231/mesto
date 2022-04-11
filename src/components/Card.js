export class Card {
  constructor(userId, data, templateSelector, handleCardClick, handleDelete, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleDelete = handleDelete;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }
  _getTemplate() {
    const galleryItem = document.querySelector(this._templateSelector).content.querySelector('.gallery__item').cloneNode(true);
    return galleryItem;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.gallery__image');
    this._galleryLikeButton = this._element.querySelector('.gallery__button');
    this._deleteButton = this._element.querySelector('.gallery__delete-button')
    this._likeCounter = this._element.querySelector('.gallery__like-counter');
    this._likeCounter.textContent = this._likes.length;
    this._addListeners();
    this._element.querySelector('.gallery__image-title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if(this.isLiked()) {
      this.handleLike(this._likes);
    }

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none'
    }
    return this._element;
  }
  isLiked() {
    const hasLike = this._likes.find(user => user._id === this._userId)
    return hasLike;
  }
  handleLike(updatedLikes) {
    this._likes = updatedLikes;
    this._galleryLikeButton.classList.toggle('gallery__button_active');
    this._likeCounter.textContent = this._likes.length;
  }
  removeFromPage() {
    this._element.remove();
    this._element = null;
  }
  _addListeners() {
    this._galleryLikeButton.addEventListener('click', () => this._handleLikeClick(this._cardId));
    this._element.querySelector('.gallery__delete-button').addEventListener('click', () => this._handleDelete(this._cardId));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}
