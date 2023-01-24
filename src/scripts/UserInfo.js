export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  // возвращаем данные пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }

  // устанавливаем новые данные пользователя
  setUserInfo(data) {
    nameInput.value = data.name;
    jobInput.value = data.job;
  }
}