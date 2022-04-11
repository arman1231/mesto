class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: "1783b28f-4ef8-4ae0-a25b-31efcb377bfc",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  setUserInfo({userName, userInfo}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '1783b28f-4ef8-4ae0-a25b-31efcb377bfc',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: userInfo
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: "1783b28f-4ef8-4ae0-a25b-31efcb377bfc",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: "1783b28f-4ef8-4ae0-a25b-31efcb377bfc",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: "1783b28f-4ef8-4ae0-a25b-31efcb377bfc",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          _id: id
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  // getCardLikes() {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     headers: {
  //       authorization: "1783b28f-4ef8-4ae0-a25b-31efcb377bfc",
  //     },
  //   }).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     console.log(`Ошибка: ${res.status}`);
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   });
  // }
  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '1783b28f-4ef8-4ae0-a25b-31efcb377bfc',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({
      //   likes: '222'
      // })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '1783b28f-4ef8-4ae0-a25b-31efcb377bfc',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({
      //   likes: '222'
      // })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '1783b28f-4ef8-4ae0-a25b-31efcb377bfc',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "1783b28f-4ef8-4ae0-a25b-31efcb377bfc",
    "Content-Type": "application/json",
  },
});

