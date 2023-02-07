export default class Card {

  constructor({ likes, _id, name, link, owner, createdAt }, template, handleCardClick) {

    this._template = template;
    this._title = name;
    this._link = link;
    this._openImagePopup = handleCardClick;
    this._likes = likes;

    console.log(this._element)

    // получаем копию разметки карточки
    this._element = this._template.cloneNode(true);
  }


  // удаление
  _deleteCard() {
    this._element.remove();
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

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard()
    })

    this._element.querySelector('.element__image').addEventListener('click', this._openImagePopup);
  }


  // генерация карточки
  generateCard() {
    // подставляем данные в разметку
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').setAttribute('alt', this._title);
    this._element.querySelector('.element__image').setAttribute('src', this._link);
    this._element.querySelector('.element__likes').textContent = this._likes.length;

    this._setEventListeners()

    // возвращаем готовый элемент
    return this._element;
  }
}

