let profileTitleElement = document.querySelector('.profile__title');
let profileSubtitleElement = document.querySelector('.profile__subtitle');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__closer');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');

// редактирование имени и информации
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = jobInput.value;
  closePopup();
}

// закрытие попапа
const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

// открытие попапа
const openPopup = function () {
  // заполняем поля формы значениями со страницы
  nameInput.setAttribute('value', profileTitleElement.textContent);
  jobInput.setAttribute('value', profileSubtitleElement.textContent);
  popupElement.classList.add('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
