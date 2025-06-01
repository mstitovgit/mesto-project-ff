import { deleteCard, likeCard, unlikeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const cardNode = cardTemplate.querySelector(".card");

function getCardTemplate() {
  return cardNode.cloneNode(true);
}

export function createCard(card, removeCard, likeHandler, imageClickHandler, myId) {
  const newCard = getCardTemplate();
  const image = newCard.querySelector(".card__image");
  const likeButton = newCard.querySelector(".card__like-button");
  const likeCounter = newCard.querySelector(".card__like-counter");
  const deleteButton = newCard.querySelector(".card__delete-button");
  if (card.owner._id !== myId) {
    deleteButton.style.display = "none";
  }
  if (card.likes.some((user) => user._id === myId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeCounter.textContent = card.likes.length;
  image.src = card.link;
  image.alt = card.name;
  newCard.querySelector(".card__title").textContent = card.name;
  image.addEventListener("click", () => imageClickHandler(card.link, card.name));
  likeButton.addEventListener("click", (e) => {
    likeHandler(e, card._id, likeCounter);
  });
  newCard.querySelector(".card__delete-button").addEventListener("click", () => removeCard(newCard, card._id));
  return newCard;
}

export function removeCard(card, id) {
  deleteCard(id)
    .then(() => card.remove())
    .catch((err) => {
      console.log(err);
    });
}

export function likeHandler(evt, cardId, likeCounter) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    likeCard(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        evt.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    unlikeCard(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        evt.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
