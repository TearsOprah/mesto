// показ ошибки
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    // убираем ошибку
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    // показать ошибку
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }
}

// отключение кнопки
const toggleButtonValid = (inputs, button, config) => {
  const isFormValid = inputs.every((input) => input.validity.valid)

  if (isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.classList.add(config.inactiveButtonClass);
  }
}

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config
  const forms = [...document.querySelectorAll(formSelector)]

  // проходим по всем формам для валидации
  forms.forEach((form) => {
    // находим все инпуты и кнопку
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    })

    // валидация инпутов
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, restConfig);
        toggleButtonValid(inputs, button, restConfig);
      })
    })
  })
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
});