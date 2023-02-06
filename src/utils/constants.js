// необходимые константы
const
  popupEditOpenButtonElement = document.querySelector('.profile__edit-button'),
  popupAddOpenButtonElement = document.querySelector('.profile__add-button'),
  formEditElement = document.querySelector('form[name="edit-form"]'),
  cardTemplate = document.querySelector('.card-template').content.querySelector('.element'),
  formAddElement = document.querySelector('form[name="add-form"]'),
  cardsContainerSelector = '.elements__list',
  popupImageElementSelector = '.popup_type_image',
  popupAddElementSelector = '.popup_type_add',
  popupEditElementSelector = '.popup_type_edit',
  nameInput = document.querySelector('#nameInput'),
  jobInput = document.querySelector('#jobInput'),
  profileTitleElementSelector = '.profile__title',
  profileSubtitleElementSelector = '.profile__subtitle',
  profileAvatarElementSelector = '.profile__avatar';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}

// дефолтные карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  popupEditOpenButtonElement,
  popupAddOpenButtonElement,
  cardTemplate,
  formAddElement,
  config,
  formEditElement,
  initialCards,
  cardsContainerSelector,
  popupImageElementSelector,
  popupAddElementSelector,
  popupEditElementSelector,
  profileTitleElementSelector,
  profileSubtitleElementSelector,
  nameInput,
  jobInput,
  profileAvatarElementSelector
}

