export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Загрузка информации о пользователе с сервера
  getUserData() {
    return fetch('https://nomoreparties.co/v1/cohort-59/users/me', {
    headers: this._headers
    })
      // получили ответ, если все ок - создаем объект иначе пропускаем все then и попадаем в catch
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then((data) => {
        return data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      headers: this._headers
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then((data) => {
        return data
      })
      .catch((err) => {
        console.log(err)
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
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => {
        console.log(err)
      })}

  addNewCard({name, link}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => {
        console.log(err)
      })
  }

  deleteCard(cardId) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => {
        console.log(err)
      })
  }
}

//Токен: 9d89c91e-8283-405d-99c3-5ef7c632611e
//Идентификатор группы: cohort-59"