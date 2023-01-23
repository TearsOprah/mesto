import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__field');
    this._handleFormSubmit = handleFormSubmit;
  }

  // собираем данные из всех полей формы
  _getInputValues() {
    const data = {}
    this._inputs.forEach((item) => {
      data[item.name] = item.value;
    })
    return data;
  }

  setEventListeners() {
    super.setEventListeners()
    // добавляем обработчик submit для формы
    this._popupForm.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
    })
  }

  close() {
    super.close()
    // при закрытии попапа сбрасываем форму
    this._popupForm.reset()
  }

}