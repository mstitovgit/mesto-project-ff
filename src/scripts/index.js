import "../pages/index.css";
import { createCard, likeCard, likeHandler, removeCard } from "./card";
import { initialCards } from "./cards";
import { addListenerOnPopup, closeModal, openModal } from "./modal";

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const profileInfoName = document.querySelector(".profile__title");
const profileInfoDescription = document.querySelector(".profile__description");

const imageClickHandler = (image, caption) => {
  popupImage.querySelector(".popup__image").src = image;
  popupImage.querySelector(".popup__caption").textContent = caption;
  openModal(popupImage, image);
};

const resetProfileEdit = () => {
  editProfileForm.elements.name.value = profileInfoName.textContent;
  editProfileForm.elements.description.value = profileInfoDescription.textContent;
};

const editProfileSumbitHandler = (evt) => {
  evt.preventDefault();
  profileInfoName.textContent = editProfileForm.elements.name.value;
  profileInfoDescription.textContent = editProfileForm.elements.description.value;
  closeModal(popupEdit);
};

const newPlaceSumbitHandler = (evt) => {
  evt.preventDefault();
  const card = {
    name: newPlaceForm.elements["place-name"].value,
    link: newPlaceForm.elements.link.value,
  };
  placesList.prepend(createCard(card, removeCard, likeHandler, imageClickHandler));
  newPlaceForm.reset();
  closeModal(popupNewCard);
};

editProfileForm.addEventListener("submit", editProfileSumbitHandler);
newPlaceForm.addEventListener("submit", newPlaceSumbitHandler);

profileEditButton.addEventListener("click", () => {
  resetProfileEdit();
  openModal(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

addListenerOnPopup(popupEdit);
addListenerOnPopup(popupNewCard);
addListenerOnPopup(popupImage);

initialCards.forEach((card) => placesList.append(createCard(card, removeCard, likeHandler, imageClickHandler)));
