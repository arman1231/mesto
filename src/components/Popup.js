export default class Popup {
  constructor(popupSelector) {
    this._modal = popupSelector;
  }
  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
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
