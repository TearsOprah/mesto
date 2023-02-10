export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // получили ответ, если все ок - создаем объект иначе пропускаем все then и попадаем в catch
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // Загрузка информации о пользователе с сервера
  getUserData() {
    return fetch('https://nomoreparties.co/v1/cohort-59/users/me', {
    headers: this._headers
    })
      .then(res => this._getResponseData(res))
      .then((data) => {
        return data
      })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
      .then((data) => {
        return data
      })
  }

  setUserData({name, job}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: job
      })
    })
      .then(res => this._getResponseData(res))
  }

  addNewCard({name, link}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => this._getResponseData(res))
  }

  deleteCard(cardId) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }

  setLike(cardId) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }

  deleteLike(cardId) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }

  updateAvatar({ avatar }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => this._getResponseData(res))
  }
}



//Токен: 9d89c91e-8283-405d-99c3-5ef7c632611e
//Идентификатор группы: cohort-59"