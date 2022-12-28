class Card {

  constructor(data, template, openImagePopup) {

    this._template = template;
    this._title = data.name;
    this._link = data.link;
    this._openImagePopup = openImagePopup;

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

    this._setEventListeners()

    // возвращаем готовый элемент
    return this._element;
  }
}




// class Card {
//
//   constructor(data, template) {
//     this._template = template;
//     this._title = data.name;
//     this._link = data.link;
//
//     // получаем копию разметки карточки
//     this._element = this._template.cloneNode(true);
//
//     // удаление карточки
//     this._element.querySelector('.element__delete').addEventListener('click', () => {
//       this._element.remove();
//     })
//
//     // лайк
//     this._element.querySelector('.element__like').addEventListener('click', () => {
//       this._element.querySelector('.element__like').classList.toggle('element__like_active');
//     })
//
//     // открытие попапа с картинкой
//     this._element.querySelector('.element__image').addEventListener('click', openImagePopup);
//   }
//
//   // генерация карточки
//   generateCard() {
//     // подставляем данные в разметку
//     this._element.querySelector('.element__title').textContent = this._title;
//     this._element.querySelector('.element__image').setAttribute('alt', this._title);
//     this._element.querySelector('.element__image').setAttribute('src', this._link);
//
//     // возвращаем готовый элемент
//     return this._element;
//   }
// }

