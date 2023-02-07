import Popup from "./Popup";

export default class PopupWithConfirm extends Popup{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', () => {
      this._handleFormSubmit(this._targetElement)
    })
  }

  setTargetElement(element) {
    this._targetElement = element;
  }
}