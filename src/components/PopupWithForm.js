import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, functionCallbackOnSubmit) {
    super(popupSelector);
    this._functionCallbackOnSubmit = functionCallbackOnSubmit;
    this._form = this._modal.querySelector('.modal__form');
    this._inputList = this._modal.querySelectorAll('.modal__input');
  }

  _getInputValues() {
    const inputs = [...this._inputList];
    const data = {};
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => { this._functionCallbackOnSubmit(this._getInputValues()) });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
