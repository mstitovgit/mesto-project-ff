export const openModal = (popup) => {
  popup.classList.add("popup_is-opened");

  const clickOutsideHandler = (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  };

  const clickCloseHandler = () => closeModal(popup);

  const keyEscapeHandler = (evt) => {
    if (evt.key === "Escape") {
      closeModal(popup);
    }
  };

  popup.listeners = {
    clickOutsideHandler,
    clickCloseHandler,
    keyEscapeHandler,
  };

  document.addEventListener("click", clickOutsideHandler);
  document.addEventListener("keydown", keyEscapeHandler);
  popup.querySelector(".popup__close").addEventListener("click", clickCloseHandler);
};

export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  const { clickOutsideHandler, clickCloseHandler, keyEscapeHandler } = popup.listeners || {};
  popup.removeEventListener("click", clickOutsideHandler);
  popup.querySelector(".popup__close").removeEventListener("click", clickCloseHandler);
  document.removeEventListener("keydown", keyEscapeHandler);
  popup.listeners = {};
};
