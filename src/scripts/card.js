const cardTemplate = document.querySelector("#card-template").content;
const cardNode = cardTemplate.querySelector(".card");

function getCardTemplate() {
  return cardNode.cloneNode(true);
}

export function createCard(card, removeCard, likeHandler, imageClickHandler) {
  const newCard = getCardTemplate();
  const image = newCard.querySelector(".card__image");
  const likeButton = newCard.querySelector(".card__like-button");
  image.src = card.link;
  image.alt = card.name;
  newCard.querySelector(".card__title").textContent = card.name;
  image.addEventListener("click", () => imageClickHandler(card.link, card.name));
  likeButton.addEventListener("click", likeHandler);
  newCard.querySelector(".card__delete-button").addEventListener("click", () => removeCard(newCard));
  return newCard;
}

export function removeCard(card) {
  card.remove();
}

export function likeHandler(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
