export class FormValidator {
  constructor(formObject, form) {
    this._formObject = formObject;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._formObject.inputSelector));
    this._buttonElement = this._form.querySelector(this._formObject.submitButtonSelector);
  }
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    // Остальной код такой же
    inputElement.classList.add(this._formObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formObject.errorClass);
  };

  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    // Остальной код такой же
    inputElement.classList.remove(this._formObject.inputErrorClass);
    errorElement.classList.remove(this._formObject.errorClass);
    errorElement.textContent = '';
  };
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  };
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    })
    }
  toggleButtonState () {
    if(this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._formObject.inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._formObject.inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled');
    }
  }
  _setEventListeners() {
    this.toggleButtonState();
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement)
        this.toggleButtonState();
      });
    });
  };
  enableValidation() {
    this._form.addEventListener('submit', (e) => {
      // У каждой формы отменим стандартное поведение
      e.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    this._setEventListeners();
  };
}

