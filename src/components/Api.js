class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
}

//Токен: 9d89c91e-8283-405d-99c3-5ef7c632611e
//Идентификатор группы: cohort-59"

// fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
//   headers: {
//     authorization: '9d89c91e-8283-405d-99c3-5ef7c632611e'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// Загрузка информации о пользователе с сервера
// const getProfile = () => {
//   fetch('https://nomoreparties.co/v1/cohort-59/users/me', {
//     headers: {
//       authorization: '9d89c91e-8283-405d-99c3-5ef7c632611e'
//     }
//   })
//     // получили ответ, если все ок - создаем объект иначе пропускаем все then и попадаем в catch
//     .then(res => res.ok ? res.json() : Promise.reject())
//     .then((result) => {
//       console.log(result);
//     })
//     .catch();
// }
//
// getProfile()