import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, functionCallbackOnSubmit) {
    super(popupSelector);
    this._functionCallbackOnSubmit = functionCallbackOnSubmit;
  }

  _getInputValues() {
    const inputs = [...this._modal.querySelectorAll('.modal__input')];
    const data = {}
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners(form) {
    super.setEventListeners();
    form.addEventListener('submit', () => { this._functionCallbackOnSubmit(this._getInputValues()) });
  }

  close() {
    super.close();
    this._modal.querySelector('.modal__form').reset();
  }
}
