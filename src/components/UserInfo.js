export class UserInfo {
  constructor(data) {
    this._userNameSelector = data.userName;
    this._userInfoSelector = data.userInfo;
  }
  getUserInfo() {
    const data = {}
    data.userName = this._userNameSelector;
    data.userInfo = this._userInfoSelector;
    return data;
  }
  setUserInfo(newData) {
    this._userNameSelector.textContent = newData.userName;
    this._userInfoSelector.textContent = newData.userInfo;
  }
}
