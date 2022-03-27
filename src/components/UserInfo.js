export class UserInfo {
  constructor(data) {
    this._userName = data.userName;
    this._userInfo = data.userInfo;
  }
  getUserInfo() {
    const data = {}
    data.userName = this._userName.textContent;
    data.userInfo = this._userInfo.textContent;
    return data;
  }
  setUserInfo(data) {
    this._userName.textContent = data.userName;
    this._userInfo.textContent = data.userInfo;
  }
}
