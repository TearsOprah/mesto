export default class Card {

  constructor({ likes, _id, name, link, owner, createdAt },
              template,
              handleCardClick,
              handleDeleteCard,
              userId) {

    this._template = template;
    this._title = name;
    this._link = link;
    this._openImagePopup = handleCardClick;
    this._openDeletePopup = handleDeleteCard;
    this._likes = likes;
    this._userId = userId;
    this._owner = owner;
    this._id = _id;


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
    this._openDeletePopup(this._id)
  }

  // лайк
  _toggleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  // слушатели
  _setEventListeners() {

    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._toggleLike();
    });


    if (this._element.querySelector('.element__delete')) {
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._handleDelete()
      })
    }


    this._element.querySelector('.element__image').addEventListener('click', this._openImagePopup);
  }


  // генерация карточки
  generateCard() {
    // подставляем данные в разметку
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').setAttribute('alt', this._title);
    this._element.querySelector('.element__image').setAttribute('src', this._link);
    this._element.querySelector('.element__likes').textContent = this._likes.length;

    if (this._owner._id !== this._userId) {
      this._element.querySelector('.element__delete').remove()
    }

    this._setEventListeners()

    // возвращаем готовый элемент
    return this._element;
  }
}

