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



// api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '9d89c91e-8283-405d-99c3-5ef7c632611e',
    'Content-Type': 'application/json'
  }
});


// загрузка карточек и данных пользователя с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    // получаем данные пользователя с сервера и вставляем в верстку
    userInfo.setUserInfo(userData)
    // получаем массив, и для каждого элемента массива(объекта) создаем карточку
    initialCards.reverse().forEach(item => {
      createCard(item)
    })
  })
  .catch(err => {
    console.log(err)
  })


// создание новых карточек из формы
const handleAddFormSubmit = (e, data) => {
  renderLoading(formAddElement.querySelector('.popup__save-button') ,true)
  e.preventDefault();
  api.addNewCard(data)
    .then(data => {
      createCard(data);
      addPopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(formAddElement.querySelector('.popup__save-button') ,false)
    })

  // отключаем кнопку добавить после создания новой карточки
  addValidator.disableSubmitButton()
}


// создали эксемляр UserInfo
const userInfo = new UserInfo({nameSelector: profileTitleElementSelector, jobSelector: profileSubtitleElementSelector, avatarSelector: profileAvatarElementSelector})


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
      editPopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(formEditElement.querySelector('.popup__save-button') ,false)
    })
}


function handleAvatarFormSubmit(ev, data) {
  renderLoading(formAvatarElement.querySelector('.popup__save-button') ,true)
  // отменяем перезагрузку страницы
  ev.preventDefault();
  // отправляем запрос
  api.updateAvatar(data)
    .then(() => {
      // обновляем avatar
      userInfo.setAvatar(data)
      //закрываем попап
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(formAvatarElement.querySelector('.popup__save-button'),false)
    })

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


const deletePopup = new PopupWithConfirm(popupDeleteElementSelector, (ev, cardId, card) => {

  ev.preventDefault()
  api.deleteCard(cardId)
    .then(() => {
      card.delete()
      deletePopup.close()
    })
    .catch((err) => {
      console.log(err)
    })
})
deletePopup.setEventListeners();


// функция создания карточки
const createCard = (item) => {
  const card = new Card({
    data: item,
    template: cardTemplate,
    handleCardClick: () => imagePopup.open(item.name, item.link),

    handleDeleteCard: (cardId) => {
      deletePopup.setCard(card)
      deletePopup.setElementId(cardId);
      deletePopup.open()
    },

    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((item) => {
          card.handleLikeCard(item)
        })
        .catch((err) => {
          console.log(err)
        })
  },

    handleDeleteLike: (cardId) => {
      api.deleteLike(cardId)
        .then((item) => {
          card.handleLikeCard(item)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    userId: userInfo.id});

  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}


// генерация стартовых карточек
const cardsList = new Section({
  items: [],
  renderer: createCard
}, cardsContainerSelector)


// рендер всех карточек на странице
cardsList.renderItems()


// слушатели на кнопки добавления и редактирования
popupAvatarOpenButtonElement.addEventListener('click', () => {
  avatarPopup.open();
})
popupAddOpenButtonElement.addEventListener('click',  () => addPopup.open());
popupEditOpenButtonElement.addEventListener('click', () => {
  // перед открытием получаем данные пользователя
  const info = userInfo.getUserInfo()
  // вставляем данные name и job в инпуты
  fillProfileForm(info)
  editPopup.open()});
