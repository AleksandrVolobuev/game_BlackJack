import { playMetalSound } from "./modules/sound.js";
import {
  startGame,
  drawCard,
  passTurn,
  endGame,
  newGame,
} from "./modules/gameLogic.js";

startGame();

const metalSound = document.getElementById("metal-sound");
// Добавляем обработчик клика на кнопку
document.querySelector(".draw-button").addEventListener("click", () => {
  playMetalSound();
  drawCard();
});
// Вызов функции для взятия карты (или другой логики)
document.querySelector(".pass-turn-button").addEventListener("click", () => {
  playMetalSound();
  passTurn();
});
document.querySelector(".end-game-button").addEventListener("click", () => {
  playMetalSound();
  window.close();
});
document.querySelector(".new-game-button").addEventListener("click", () => {
  playMetalSound();
  newGame();
});
