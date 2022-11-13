let profileTitleElement = document.querySelector('.profile__title');
let profileSubtitleElement = document.querySelector('.profile__subtitle');

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__closer');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');

// заполняем поля формы значениями со страницы
nameInput.setAttribute('value', profileTitleElement.textContent);
jobInput.setAttribute('value', profileSubtitleElement.textContent);

// редактирование имени и информации
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = jobInput.value;
  togglePopupVisibility();
}

// закрытие и открытие попапа
const togglePopupVisibility = function() {
  popupElement.classList.toggle('popup_opened');
}

// закрытие попапа по клику на оверлей
const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupElement.classList.toggle('popup_opened');
}

// сохранение данных по нажанию Enter
const saveFormByClickEnter = function(event) {
  if (event.key === 'Enter' && popupElement.classList.contains('popup_opened')) {
    event.preventDefault();
    profileTitleElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;
    togglePopupVisibility();
  }
}

popupOpenButtonElement.addEventListener('click', togglePopupVisibility);
popupCloseButtonElement.addEventListener('click', togglePopupVisibility);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler); 
document.addEventListener('keypress', saveFormByClickEnter);