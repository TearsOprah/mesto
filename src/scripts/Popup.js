export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closeBtn = this._popup.querySelector('.popup__closer');
    this._escClose = this._handleEscClose.bind(this);
  }

  // открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    // вешаем слушатель закрытия на esc
    document.addEventListener('keydown', this._escClose)
  }

  // закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    // снимаем слушатель закрытия на esc
    document.removeEventListener('keydown', this._escClose);
  }

  // закрытие на esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._closeBtn.addEventListener('click', () => {
      this.close();
    })
    // закрытие на клик вокруг попапа
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    })
  }
}