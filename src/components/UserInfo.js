export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    console.log(this._job)
    this._avatar = document.querySelector(avatarSelector);
    console.log(this._avatar)
  }

  // вставляем данные в верстку
  setUserInfo({name, about, avatar}) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
  }

  // возвращаем данные пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }

  // устанавливаем новые данные пользователя
  setNewUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}