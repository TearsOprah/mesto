import Popup from "./Popup";

export default class PopupWithConfirm extends Popup{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', (ev) => {
      this._handleFormSubmit(ev, this._targetElement)
    })
  }

  setElementId(element) {
    this._targetElement = element;
  }

  getElementId() {
    return this._targetElement;
  }
}