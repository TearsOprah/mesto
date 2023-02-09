import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
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
  profileAvatarElementSelector,
  popupDeleteElementSelector,
  popupAvatarElementSelector,
  popupAvatarOpenButtonElement,
  formAvatarElement
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
  renderLoading(formAddElement.querySelector('.popup__save-button') ,true)
  e.preventDefault();
  api.addNewCard(data)
    .then(data => {
      createCard(data)
    })
    .finally(() => {
      renderLoading(formAddElement.querySelector('.popup__save-button') ,false)
    })

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
  renderLoading(formEditElement.querySelector('.popup__save-button') ,true)
  evt.preventDefault();
  api.setUserData(data)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      renderLoading(formEditElement.querySelector('.popup__save-button') ,false)
    })

  editPopup.close()
}


function handleDeleteCard(cardId) {
  // console.log(cardId)
  deletePopup.setElementId(cardId);
  deletePopup.open()
}


function handleAvatarFormSubmit(ev, data) {
  renderLoading(formAvatarElement.querySelector('.popup__save-button') ,true)
  // отменяем перезагрузку страницы
  ev.preventDefault();
  // отправляем запрос
  api.updateAvatar(data)
    .then(res => {
    })
    .finally(() => {
      renderLoading(formAvatarElement.querySelector('.popup__save-button'),false)
    })
  // подменяем картинку на картинку из ответа
  document.querySelector(profileAvatarElementSelector).src = data.avatar
  //закрываем попап
  avatarPopup.close()
}


// подмена текста во время ожидания ответа сервера
function renderLoading(element, isLoading) {

  if (isLoading) {
    element.value = 'Сохранение...';
  } else {
    element.value = 'Сохранить';
  }
}


// валидация форм
const editValidator = new FormValidator(config, formEditElement);
editValidator.enableValidation();
const addValidator = new FormValidator(config, formAddElement);
addValidator.enableValidation();
const avatarValidator = new FormValidator(config, formAvatarElement);
avatarValidator.enableValidation();


// cоздаем экземляры всех попапов и вешаем слушатель клика по кнопке закрытия
const imagePopup = new PopupWithImage(popupImageElementSelector);
imagePopup.setEventListeners();

const addPopup = new PopupWithForm(popupAddElementSelector, handleAddFormSubmit)
addPopup.setEventListeners();

const editPopup = new PopupWithForm(popupEditElementSelector, handleEditFormSubmit)
editPopup.setEventListeners();

const avatarPopup = new PopupWithForm(popupAvatarElementSelector, handleAvatarFormSubmit)
avatarPopup.setEventListeners();


const deletePopup = new PopupWithConfirm(popupDeleteElementSelector, (ev, cardId) => {

  ev.preventDefault()

  // console.log(ev.target.closest('.element'))
  console.log(cardId)



  api.deleteCard(cardId)
    .then(() => {
      document.getElementById(cardId).remove()
      deletePopup.close()
    })

  // cardElement.remove();
  // deletePopup.close();
})
deletePopup.setEventListeners();


// функция создания карточки
const createCard = (item) => {
  const card = new Card({
    data: item,
    template: cardTemplate,
    handleCardClick: () => imagePopup.open(item.name, item.link),
    handleDeleteCard,

    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((item) => {
          console.log(item)
          console.log(cardId)
          card.handleLikeCard(item)
        })
  },

    handleDeleteLike: (cardId) => {
      api.deleteLike(cardId)
        .then((item) => {
          // console.log('данные карточки:')
          // console.log(item)
          console.log('id этой карточки: ' + cardId)
          card.handleLikeCard(item)
        })
    },

    userId: userInfo.id});

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
popupAvatarOpenButtonElement.addEventListener('click', () => avatarPopup.open())
popupAddOpenButtonElement.addEventListener('click',  () => addPopup.open());
popupEditOpenButtonElement.addEventListener('click', () => {
  // перед открытием получаем данные пользователя
  const info = userInfo.getUserInfo()
  // вставляем данные name и job в инпуты
  fillProfileForm(info)
  editPopup.open()});
