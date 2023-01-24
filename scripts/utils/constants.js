// необходимые константы
const
  profileTitleElement = document.querySelector('.profile__title'),
  profileSubtitleElement = document.querySelector('.profile__subtitle'),
  popupEditElement = document.querySelector('.popup_type_edit'),
  popupAddElement = document.querySelector('.popup_type_add'),
  popupImageElement = document.querySelector('.popup_type_image'),
  popupEditOpenButtonElement = document.querySelector('.profile__edit-button'),
  popupAddOpenButtonElement = document.querySelector('.profile__add-button'),
  formEditElement = document.querySelector('form[name="edit-form"]'),
  nameInput = formEditElement.querySelector('#nameInput'),
  jobInput = formEditElement.querySelector('#jobInput'),
  cardTemplate = document.querySelector('.card-template').content.querySelector('.element'),
  cardsContainer = document.querySelector('.elements__list'),
  formAddElement = document.querySelector('form[name="add-form"]');


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}

export {
  nameInput,
  jobInput,
  profileTitleElement,
  profileSubtitleElement,
  popupEditElement,
  popupAddElement,
  popupImageElement,
  popupEditOpenButtonElement,
  popupAddOpenButtonElement,
  cardTemplate,
  cardsContainer,
  formAddElement,
  config,
  formEditElement
}