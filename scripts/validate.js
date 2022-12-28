

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    // все инпуты и кнопка
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._button = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  // Проверка валидности инпутов
  _checkInputValidity = (inputSelector) => {
    const error = this._formElement.querySelector(`#${inputSelector.id}-error`);

    // если поле валидно
    if (inputSelector.validity.valid) {
      // убираем ошибку
      error.textContent = '';
      error.classList.remove(this._config.errorClass);
      inputSelector.classList.remove(this._config.inputErrorClass);
    } else {
      // иначе показываем ошибку
      error.textContent = inputSelector.validationMessage;
      error.classList.add(this._config.errorClass);
      inputSelector.classList.add(this._config.inputErrorClass);
    }
  }

  // отключение кнопки
  _toggleButtonValid() {
    const isFormValid = this._inputs.every((input) => input.validity.valid)

    if (isFormValid) {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = '';
    } else {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = 'disabled';
    }
  }

  // устанавливаем слушатели
  _setEventListeners() {
    // чтоб при открытии попапа кнопка была не активна
    this._toggleButtonValid()

    // валидация инпутов
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonValid();
      })
    })

    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}


const editValidator = new FormValidator(config, formEditElement);
editValidator.enableValidation();

const addValidator = new FormValidator(config, formAddElement);
addValidator.enableValidation();
