const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const popupElement = document.querySelector('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');
const popupImageElement = document.querySelector('.popup_type_image');
const popupEditCloseButtonElement = document.querySelector('.popup__closer_type_edit');
const popupAddCloseButtonElement = document.querySelector('.popup__closer_type_add');
const popupImageCloseButtonElement = document.querySelector('.popup__closer_type_image');
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');

const formEditElement = document.querySelector('form[name="edit-form"]');
const nameInput = formEditElement.querySelector('#nameInput');
const jobInput = formEditElement.querySelector('#jobInput');

const formAddElement = document.querySelector('form[name="add-form"]');
const cardNameInput = formAddElement.querySelector('#cardNameInput');
const linkInput = formAddElement.querySelector('#linkInput');

const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.element');



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







// создание карточки
function createElement(item) {
  const card = cardTemplate.cloneNode(true);
  // находим заголовок, картинку, лайк и удаление
  const cardTitle = card.querySelector('.element__title');
  const cardImage = card.querySelector('.element__image');
  const cardLikeButton = card.querySelector('.element__like');
  const cardDeleteButton = card.querySelector('.element__delete');

  // прослушиватели для удаления и лайка
  cardLikeButton.addEventListener('click', handleLikeButtonClick);
  cardDeleteButton.addEventListener('click', handleDeleteButtonClick);

  // прослушиватель для клика по картинке
  cardImage.addEventListener('click', openImagePopup);

  // задаем заголовок и картинку
  cardTitle.textContent = item.name;
  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);

  // возвращаем карточку
  return card;
}

// открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyUp);
  popup.addEventListener('click', closeByClickOnOverlay);
}

// открытие попапа картинки
const openImagePopup = function (e) {
  const image = document.querySelector('.popup__image');
  const description = document.querySelector('.popup__description');
  image.setAttribute('src', e.target.src);
  image.setAttribute('alt', e.target.alt);
  description.textContent = e.target.alt;
  openPopup(popupImageElement);
}

// открытие попапа редактирования
const openEditPopup = function () {
  // заполняем поля формы значениями со страницы
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileSubtitleElement.textContent;
  openPopup(popupEditElement);
}

// открытие попапа добавления карточек
const openAddPopup = function () {
  openPopup(popupAddElement);
}

// закрытие попапов
const closePopup = (e) => {
  e.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleKeyUp);
}

const closeImagePopup = () => {
  closePopup(popupImageElement);
}

const closeAddPopup = () => {
  closePopup(popupAddElement);
}

const closeEditPopup = () => {
  closePopup(popupEditElement);
}

// закрытие на esc
const handleKeyUp = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

// закрытие по клику вне формы
const closeByClickOnOverlay = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (!evt.target.closest('.popup__container') && !evt.target.closest('.popup__image-container')) {
    closePopup(popup);
  }
}


// накидывание лайка
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('element__like_active')
}

// удаление
const handleDeleteButtonClick = (e) => {
  e.target.closest('.element').remove();
}

// рендер карточки
const renderCard = (item, wrapElement) => {
  // получаем карточку
  const element = createElement(item);
  // добавляем карточку в лист
  wrapElement.prepend(element);
}

// проходим по стартовому массиву и применяем к каждому элементу функцию рендера карточки
initialCards.forEach(function(item) {
  renderCard(item, cardsContainer);
})

// создание новых карточек из формы
const handleAddFormSubmit = (e) => {
  e.preventDefault();

  // получаем значения из формы
  const card = {
    name: cardNameInput.value,
    link: linkInput.value
  }

  // добавляем в верстку
  renderCard(card, cardsContainer);

  // закрываем попап
  closePopup(popupAddElement);
}

// редактирование имени и информации
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = jobInput.value;
  closePopup(popupEditElement);
}

// прослушиватели
popupImageCloseButtonElement.addEventListener('click', closeImagePopup);
popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupAddCloseButtonElement.addEventListener('click', closeAddPopup);
popupEditOpenButtonElement.addEventListener('click', openEditPopup);
popupEditCloseButtonElement.addEventListener('click', closeEditPopup);
formEditElement.addEventListener('submit', handleEditFormSubmit); 
formAddElement.addEventListener('submit', handleAddFormSubmit);