import { flippedCardsPlayer, flippedCardsOpponent } from './gameLogic.js';
import { playGolosSound } from "./sound.js";
export function updateUI(playerCards, opponentCards, playerScore, opponentScore) {
  // Игрок
  document.getElementById("player-cards").innerHTML = playerCards
    .map((card, index) => {
      const isFlipped = flippedCardsPlayer[index] || false;
      return `
        <div class="card player-card ${isFlipped ? "flipped" : ""}" data-card-index="${index}">
          <div class="card-inner">
            <div class="card-front"><img src="./assets/img/0.png"></div>
            <div class="card-back"><img src="${card.img}"></div>
          </div>
        </div>`;
    }).join("");

  document.getElementById("player-score").innerText = playerScore;

  // Противник
  document.getElementById("opponent-cards").innerHTML = opponentCards
    .map((card, index) => {
      const isFlipped = flippedCardsOpponent[index] || false;
      return `
        <div class="card opponent-card ${isFlipped ? "flipped" : ""}">
          <div class="card-inner">
            <div class="card-front"><img src="./assets/img/0.png"></div>
            <div class="card-back"><img src="${card.img}"></div>
          </div>
        </div>`;
    }).join("");

 document.getElementById("opponent-score").innerText = opponentScore;

  attachPlayerCardListeners();
}

let playerListenerAttached = false;

function attachPlayerCardListeners() {
  if (playerListenerAttached) return;

  document.getElementById("player-cards").addEventListener("click", (event) => {

    const cardElement = event.target.closest(".card.player-card");
    if (!cardElement) return;
      
 
  
    const cardIndex = Number(cardElement.getAttribute("data-card-index"));
    flippedCardsPlayer[cardIndex] = !flippedCardsPlayer[cardIndex];
    cardElement.classList.toggle("flipped");
    playGolosSound();// Воспроизведение звука при взятии карты
  });

  playerListenerAttached = true;
}
