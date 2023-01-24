export default class FormValidator {
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

  _enableSubmitButton() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.disabled = '';
  }

  disableSubmitButton() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.disabled = 'disabled';
  }

  // отключение кнопки
  toggleButtonValid() {
    const isFormValid = this._inputs.every((input) => input.validity.valid)

    if (isFormValid) {
      this._enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }

  // устанавливаем слушатели
  _setEventListeners() {
    // чтоб при открытии попапа кнопка была не активна
    this.toggleButtonValid()

    // валидация инпутов
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonValid();
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