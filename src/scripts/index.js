import '../pages/index.css';
import { initialCards } from './cards'
const cardTemplate = document.querySelector("#card-template").content;
const cardNode = cardTemplate.querySelector(".card");
const placesList = document.querySelector(".places__list");

initialCards.forEach((card) => placesList.append(createCard(card, removeCard)));

function createCard(card, removeCard) {
  const newCard = cardNode.cloneNode(true);
  newCard.querySelector(".card__image").src = card.link;
  newCard.querySelector(".card__image").alt = card.name;
  newCard.querySelector(".card__title").textContent = card.name;
  newCard.querySelector(".card__delete-button").addEventListener("click", () => removeCard(newCard));
  return newCard;
}

function removeCard(card) {
  card.remove();
}
