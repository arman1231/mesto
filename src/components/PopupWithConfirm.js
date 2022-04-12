import Popup from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, functionCallbackOnSubmit) {
    super(popupSelector);
    this._functionCallbackOnSubmit = functionCallbackOnSubmit;
    this._form = this._modal.querySelector('.modal__form');
  }

  alternateSubmit(anotherFunctionCallbackOnSubmit) {
    this._functionCallbackOnSubmit = anotherFunctionCallbackOnSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => { this._functionCallbackOnSubmit() });
  }

}
