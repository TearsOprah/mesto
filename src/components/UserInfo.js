export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // вставляем данные в верстку
  setUserInfo({name, about, avatar, cohort, _id}) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._cohort = cohort;
    this.id = _id;
  }

  // возвращаем данные пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }
}