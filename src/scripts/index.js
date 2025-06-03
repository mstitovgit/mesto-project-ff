import "../pages/index.css";
import { editProfile, getInitialCards, getUserInfo, postCard, updateAvatar } from "./api";
import { createCard, likeHandler, removeCard } from "./card";
import { addListenerOnPopup, closeModal, openModal } from "./modal";
import { clearValidation, enableValidation } from "./valiation";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const editAvatarForm = document.forms["edit-avatar"];
const profileInfoName = document.querySelector(".profile__title");
const profileInfoDescription = document.querySelector(".profile__description");
const avatarElement = document.querySelector(".profile__image");

const preloader = (isLoading, submitButton) => {
  const loadingText = "Сохранение...";
  const defaultText = "Сохранить";
  submitButton.textContent = isLoading ? loadingText : defaultText;
};

const resetProfileEdit = () => {
  editProfileForm.elements.name.value = profileInfoName.textContent;
  editProfileForm.elements.description.value = profileInfoDescription.textContent;
};

const updateUserInfo = (data) => {
  profileInfoName.textContent = data.name;
  profileInfoDescription.textContent = data.about;
  avatarElement.style.backgroundImage = `url(${data.avatar})`;
};

const editProfileSubmitHandler = (evt) => {
  preloader(true, evt.submitter);
  const { name, description } = editProfileForm.elements;
  editProfile(name.value, description.value)
    .then((data) => {
      profileInfoName.textContent = data.name;
      profileInfoDescription.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => preloader(false, evt.submitter));
};

const imageClickHandler = (image, caption) => {
  const imageElement = popupImage.querySelector(".popup__image");
  imageElement.src = image;
  imageElement.alt = caption;
  popupImage.querySelector(".popup__caption").textContent = caption;
  openModal(popupImage, image);
};

const newPlaceSubmitHandler = (evt) => {
  preloader(true, evt.submitter);
  const card = {
    name: newPlaceForm.elements["place-name"].value,
    link: newPlaceForm.elements.link.value,
  };
  postCard(card)
    .then((card) => {
      placesList.prepend(createCard(card, removeCard, likeHandler, imageClickHandler, card.owner._id));
      newPlaceForm.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => preloader(false, evt.submitter));
};

const editAvatarHandler = (evt) => {
  preloader(true, evt.submitter);
  const link = editAvatarForm.elements.link.value;
  updateAvatar(link)
    .then((res) => {
      avatarElement.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => preloader(false, evt.submitter));
};

const renderCards = (cards, myId) => {
  cards.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeHandler, imageClickHandler, myId));
  });
};

editProfileForm.addEventListener("submit", editProfileSubmitHandler);
newPlaceForm.addEventListener("submit", newPlaceSubmitHandler);
editAvatarForm.addEventListener("submit", editAvatarHandler);

profileEditButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  resetProfileEdit();
  openModal(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupNewCard);
});

avatarElement.addEventListener("click", () => {
  clearValidation(editAvatarForm, validationConfig);
  openModal(popupAvatar);
});

document.querySelectorAll(".popup").forEach((popup) => {
  addListenerOnPopup(popup);
});

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cardsData]) => {
    renderCards(cardsData, userInfo._id);
    updateUserInfo(userInfo);
  })
  .catch((err) => {
    console.log(err);
  });
