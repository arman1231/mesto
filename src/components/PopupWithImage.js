import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(name, link) {
    super.setEventListeners();
    this._popupImage = this._modal.querySelector('.image-modal__img')
    this._popupImageCaption = this._modal.querySelector('.image-modal__caption');
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageCaption.textContent = name;
    super.open();
  }
}
