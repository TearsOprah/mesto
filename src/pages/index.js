import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
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
  jobInput
} from "../utils/constants.js";


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


// заполнение инпутов формы редактированя профиля
function fillProfileForm({ name, job }) {
  console.log(nameInput)
  console.log(jobInput)
  nameInput.value = name;
  jobInput.value = job;
}


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
  // вставляем данные name и job в инпуты
  fillProfileForm(info)
  editPopup.open()});
