export default class Popup {
  constructor(modal) {
    this._modal = modal;
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn = this._modal.querySelector('.modal__close-btn');
    this._closeBtn.addEventListener('click', () => this.close());
    this._modal.addEventListener('click', (e) => {
      if (e.currentTarget === e.target) {
        this.close();
      }
    })
  }

}
