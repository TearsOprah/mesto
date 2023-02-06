import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js"
import {
  initialCards,
  cardsContainerSelector,
  cardTemplate,
  config,
  formAddElement,
  formEditElement,
  popupAddOpenButtonElement,
  popupEditOpenButtonElement,
  popupImageElementSelector,
  popupAddElementSelector,
  popupEditElementSelector,
  profileSubtitleElementSelector,
  profileTitleElementSelector,
  nameInput,
  jobInput,
  profileAvatarElementSelector
} from "../utils/constants.js";
import {data} from "autoprefixer";


// api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '9d89c91e-8283-405d-99c3-5ef7c632611e',
    'Content-Type': 'application/json'
  }
});


// создание новых карточек из формы
const handleAddFormSubmit = (e, data) => {
  e.preventDefault();
  createCard(data)
  addPopup.close()
  // отключаем кнопку добавить после создания новой карточки
  addValidator.disableSubmitButton()
}


// создали эксемляр UserInfo
const userInfo = new UserInfo({nameSelector: profileTitleElementSelector, jobSelector: profileSubtitleElementSelector, avatarSelector: profileAvatarElementSelector})


// получаем данные пользователя с сервера и вставляем в верстку
api.getUserData()
  .then(data => {
    userInfo.setUserInfo(data)
  })


// заполнение инпутов формы редактированя профиля
function fillProfileForm({ name, job }) {
  nameInput.value = name;
  jobInput.value = job;
}


// редактирование имени и информации
function handleEditFormSubmit(evt, data) {
  evt.preventDefault();

  api.setUserData(data)
    .then(res => {
      userInfo.setUserInfo(res);
    })

  editPopup.close()
}


// валидация форм
const editValidator = new FormValidator(config, formEditElement);
editValidator.enableValidation();
const addValidator = new FormValidator(config, formAddElement);
addValidator.enableValidation();


// cоздаем экземляры всех попапов и вешаем слушатель клика по кнопке закрытия
const imagePopup = new PopupWithImage(popupImageElementSelector);
imagePopup.setEventListeners();

const addPopup = new PopupWithForm(popupAddElementSelector, handleAddFormSubmit)
addPopup.setEventListeners()

const editPopup = new PopupWithForm(popupEditElementSelector, handleEditFormSubmit)
editPopup.setEventListeners()


// функция создания карточки
const createCard = (item) => {
  const card = new Card(item, cardTemplate, () => imagePopup.open(item.name, item.link));
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}


// загрузка стартовых карточек с сервера
api.getInitialCards()
  .then(data => {
    // получаем массив, и для каждого элемента массива(объекта) создаем карточку
    data.forEach(item => {
      createCard(item)
    })
  })


// генерация стартовых карточек
const cardsList = new Section({
  items: [],
  renderer: createCard
}, cardsContainerSelector)


// рендер всех карточек на странице
cardsList.renderItems()


// слушатели на кнопки добавления и редактирования
popupAddOpenButtonElement.addEventListener('click',  () => addPopup.open());
popupEditOpenButtonElement.addEventListener('click', () => {
  // перед открытием получаем данные пользователя
  const info = userInfo.getUserInfo()
  // вставляем данные name и job в инпуты
  fillProfileForm(info)
  editPopup.open()});
