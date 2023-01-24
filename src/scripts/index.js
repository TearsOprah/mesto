import './../pages/index.css';
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
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
  profileTitleElementSelector
} from "./utils/constants.js";


// создание новых карточек из формы
const handleAddFormSubmit = (e, data) => {
  e.preventDefault();
  createCard(data)
  addPopup.close()
  // отключаем кнопку добавить после создания новой карточки
  addValidator.disableSubmitButton()
}

// создали эксемляр UserInfo
const userInfo = new UserInfo({nameSelector: profileTitleElementSelector, jobSelector: profileSubtitleElementSelector})

// редактирование имени и информации
function handleEditFormSubmit(evt, data) {
  evt.preventDefault();
  userInfo.setUserInfo(data)
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


// генерация стартовых карточек
const cardsList = new Section({
  items: initialCards,
  renderer: createCard
}, cardsContainerSelector)

// рендер всех карточек на странице
cardsList.renderItems()


// слушатели на кнопки добавления и редактирования
popupAddOpenButtonElement.addEventListener('click',  () => addPopup.open());
popupEditOpenButtonElement.addEventListener('click', () => {
  // перед открытием получаем данные пользователя
  const info = userInfo.getUserInfo()
  // вставляем данные в инпуты
  userInfo.setUserInfo(info)
  editPopup.open()});
