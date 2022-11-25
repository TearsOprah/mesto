let profileTitleElement = document.querySelector('.profile__title');
let profileSubtitleElement = document.querySelector('.profile__subtitle');

const popupElement = document.querySelector('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');
const popupEditCloseButtonElement = document.querySelector('.popup__closer_type_edit');
const popupAddCloseButtonElement = document.querySelector('.popup__closer_type_add');
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');

let formEditElement = document.querySelector('form[name="edit-form"]');
let nameInput = formEditElement.querySelector('#nameInput');
let jobInput = formEditElement.querySelector('#jobInput');

let formAddElement = document.querySelector('form[name="add-form"]');
let cardNameInput = formAddElement.querySelector('#cardNameInput');
let linkInput = formAddElement.querySelector('#linkInput');

const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content;

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

// добавление карточек в разметку
function outputCard(list) {
  list.forEach(function(card) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__image').setAttribute('src', card.link);
    cardElement.querySelector('.element__image').setAttribute('alt', card.name);
    cardElement.querySelector('.element__title').textContent = card.name;
  
    cardsList.prepend(cardElement);
  })
}

// добавляем дефолтные карточки
outputCard(initialCards);

// редактирование имени и информации
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = jobInput.value;
  closeEditPopup();
}

// добавление новых карточек
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const newCardList = [];
  newCardList.unshift({name: cardNameInput.value, link: linkInput.value});
  outputCard(newCardList);
  closeAddPopup();
}

// закрытие попапа редактирования
const closeEditPopup = function() {
  popupEditElement.classList.remove('popup_opened');
}

// открытие попапа редактирования
const openEditPopup = function () {
  // заполняем поля формы значениями со страницы
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileSubtitleElement.textContent;
  popupEditElement.classList.add('popup_opened');
}

//открытие попапа добавления карточек
const openAddPopup = function () {
  popupAddElement.classList.add('popup_opened');
}

// закрытие попапа добавления карточек
const closeAddPopup = function() {
  popupAddElement.classList.remove('popup_opened');
}

popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupAddCloseButtonElement.addEventListener('click', closeAddPopup);
popupEditOpenButtonElement.addEventListener('click', openEditPopup);
popupEditCloseButtonElement.addEventListener('click', closeEditPopup);
formEditElement.addEventListener('submit', formSubmitHandler); 
formAddElement.addEventListener('submit', addCardSubmitHandler);