// необходимые константы
const profileTitleElement = document.querySelector('.profile__title'),
  profileSubtitleElement = document.querySelector('.profile__subtitle'),
  popupEditElement = document.querySelector('.popup_type_edit'),
  popupAddElement = document.querySelector('.popup_type_add'),
  popupImageElement = document.querySelector('.popup_type_image'),
  popupEditOpenButtonElement = document.querySelector('.profile__edit-button'),
  popupAddOpenButtonElement = document.querySelector('.profile__add-button'),
  popupSaveButtonElement = popupAddElement.querySelector('.popup__save-button'),
  formEditElement = document.querySelector('form[name="edit-form"]'),
  nameInput = formEditElement.querySelector('#nameInput'),
  jobInput = formEditElement.querySelector('#jobInput'),
  image = document.querySelector('.popup__image'),
  description = document.querySelector('.popup__description'),
  popups = document.querySelectorAll('.popup'),
  cardTemplate = document.querySelector('.card-template').content.querySelector('.element'),
  cardsContainer = document.querySelector('.elements__list'),
  formAddElement = document.querySelector('form[name="add-form"]'),
  cardNameInput = formAddElement.querySelector('#cardNameInput'),
  linkInput = formAddElement.querySelector('#linkInput');

// открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyUp);
}

// открытие попапа картинки
const openImagePopup = function (e) {
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
  // отключаем кнопку и накидываем класс инвалид
  popupSaveButtonElement.setAttribute('disabled', '');
  popupSaveButtonElement.classList.add('popup__save-button_invalid');
  openPopup(popupAddElement);
}

// закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleKeyUp);
}

// закрытие на esc
const handleKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// редактирование имени и информации
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = jobInput.value;
  closePopup(popupEditElement);
}

// проходим по массиву и генерим стартовые карточки, вставляем их в контейнер
initialCards.forEach(item => {
  const card = new Card(item, cardTemplate, openImagePopup);
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
})

// создание новых карточек из формы
const handleAddFormSubmit = (e) => {
  e.preventDefault();

  // получаем значения из формы
  const data = {
    name: cardNameInput.value,
    link: linkInput.value
  }

  // генерим карточку и вставляем в контейнер
  const card = new Card(data, cardTemplate, openImagePopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  // очищаем поля в форме
  e.target.reset()

  // закрываем попап
  closePopup(popupAddElement);
}

// прослушиватели
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__closer')) {
      closePopup(popup)
    }
  })
})

popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupEditOpenButtonElement.addEventListener('click', openEditPopup);
formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);