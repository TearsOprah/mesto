
// отрисовка карточек на странице
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  // создание и отрисовка данных на странице
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

  // добавляем карточку
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}