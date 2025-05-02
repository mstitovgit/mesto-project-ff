const keyEscapeHandler = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyEscapeHandler);
  const clickCloseHandler = () => closeModal(popup);
  popup.querySelector(".popup__close").addEventListener("click", clickCloseHandler);
};

export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyEscapeHandler);
};

export const addListenerOnPopup = (popup) => {
  popup.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(popup);
  });
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
};
