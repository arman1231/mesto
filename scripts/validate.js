const showInputError = (formElement, inputElement, errorMessage, formObject) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  // Остальной код такой же
  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObject.errorClass);
};

const hideInputError = (formElement, inputElement, formObject) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  // Остальной код такой же
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (formElement, inputElement, formObject) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, formObject);
  }
};



function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  })
  }

function toggleButtonState (inputList, buttonElement, formObject) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObject.inactiveButtonClass)
  } else {
    buttonElement.classList.remove(formObject.inactiveButtonClass)
    buttonElement.removeAttribute('disabled');
  }
}

const setEventListeners = (formElement, formObject) => {

  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObject);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, formObject)
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
};

const enableValidation = (formObject) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  formObject = {
  formSelector: formObject.formSelector,
  inputSelector: formObject.inputSelector,
  submitButtonSelector: formObject.submitButtonSelector,
  inactiveButtonClass: formObject.inactiveButtonClass,
  inputErrorClass: formObject.inputErrorClass,
  errorClass: formObject.errorClass
}
  // const formList = Array.from(document.querySelectorAll('.modal__form'));
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, formObject);
  });
  return formObject;
};
// Вызовем функцию
// console.log(enableValidation());
 enableValidation({
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit',
  inactiveButtonClass: 'modal__submit_state_disabled',
  inputErrorClass: 'modal__input_state_error',
  errorClass: 'modal__input-error_active'
});
