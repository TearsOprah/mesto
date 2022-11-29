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

const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.element');

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

// закрытие попапа картинки
const closeImagePopup = function() {
  popupImageElement.classList.remove('popup_opened');
}

// открытие попапа картинки
const openImagePopup = function (e) {
  const image = document.querySelector('.popup__image');
  const description = document.querySelector('.popup__description');
  image.setAttribute('src', e.target.src);
  image.setAttribute('alt', e.target.alt);
  description.textContent = e.target.alt;
  popupImageElement.classList.add('popup_opened');
}

// прослушиватель закрытия картинки
popupImageCloseButtonElement.addEventListener('click', closeImagePopup);

// накидывание лайка
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('element__like_active')
  console.log(e.target.classList)
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
  renderCard(item, cardsList);
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
  renderCard(card, cardsList);

  // закрываем попап
  closeAddPopup();
}

// редактирование имени и информации
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = jobInput.value;
  closeEditPopup();
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
formEditElement.addEventListener('submit', handleEditFormSubmit); 
formAddElement.addEventListener('submit', handleAddFormSubmit);