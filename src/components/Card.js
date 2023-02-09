export default class Card {

  constructor({data,
              template,
              handleCardClick,
              handleDeleteCard,
              handleSetLike,
              handleDeleteLike,
              userId}) {

    this._template = template;
    this._title = data.name;
    this._link = data.link;
    this._openImagePopup = handleCardClick;
    this._openDeletePopup = handleDeleteCard;
    this._likes = data.likes;
    this._userId = userId;
    this._owner = data.owner;
    this._cardId = data._id;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;


    // получаем копию разметки карточки
    this._element = this._template.cloneNode(true);
  }


  // удаление
  deleteCard () {
    this._element.remove();
  }


  // попап удаления
  _handleDelete() {
    // this._element.remove();
    this._openDeletePopup(this._cardId)
  }

  // лайк
  _toggleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  // слушатели
  _setEventListeners() {

    // слушатель лайка
    this._likeBtn.addEventListener('click', () => {


      if (this._likeBtn.classList.contains('element__like_active')) {
        this._handleDeleteLike(this._cardId);
      } else {
        console.log('отправляю запрос на лайк')
        this._handleSetLike(this._cardId);
      }
    })

    // this._element.querySelector('.element__like').addEventListener('click', () => {
    //   this._toggleLike();
    // });

    // слушатель кнопки удаления карточки
    if (this._element.querySelector('.element__delete')) {
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._handleDelete()
      })
    }

    // слушатель открытия попапа с изображением
    this._element.querySelector('.element__image').addEventListener('click', this._openImagePopup);
  }


  // генерация карточки
  generateCard() {
    this._likeBtn = this._element.querySelector('.element__like');

    // подставляем данные в разметку
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').setAttribute('alt', this._title);
    this._element.querySelector('.element__image').setAttribute('src', this._link);

    this._isCardLiked();
    this._element.querySelector('.element__likes').textContent = this._likes.length;
    this._element.setAttribute('id', this._cardId);

    if (this._owner._id !== this._userId) {
      this._element.querySelector('.element__delete').remove()
    }

    this._setEventListeners()

    // возвращаем готовый элемент
    return this._element;
  }

  // проверка наличия лайка на карточке
  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('element__like_active');
    }
  }


  // не раб
  // обновление лайков
  handleLikeCard(data) {
    console.log('список пользователей ниже:')
    console.log(data.likes);

    this._likes = data.likes;
    this._element.querySelector('.element__likes').textContent = this._likes.length;
    this._likeBtn.classList.toggle('element__like_active')
  }

}

