import { dataCard } from "../dataCard.js";
import { updateUI } from "./ui.js";
import {
  playGolosSound,
  playCardSound,
  playWinSound,
  playLoseSound,
  playDrawSound,
  playMusicIntro,
} from "./sound.js";

// Инициализация переменных
export let playerCards = [];
export let opponentCards = [];
export let flippedCardsPlayer = [];
export let flippedCardsOpponent = [];

let playerScore = 0;
let opponentScore = 0;
let playerTurn = true;

// Функция для получения случайной карты
function getRandomCard() {
  const index = Math.floor(Math.random() * (dataCard.length - 1)) + 1; // от 1 до dataCard.length - 1
  return dataCard[index];
}

// Функция взятия карты игроком
function drawCardForPlayer() {
  const card = getRandomCard();
  playerCards.push(card);
  playerScore += card.value;
}

// Функция взятия карты противником
function drawCardForOpponent() {
  const card = getRandomCard();
  opponentCards.push(card);
  opponentScore += card.value;
}

// Функция начала игры
export function startGame() {
  playerCards = [];
  opponentCards = [];
  flippedCardsPlayer = [];
  flippedCardsOpponent = [];
  playerScore = 0;
  opponentScore = 0;
  playerTurn = true;
  playMusicIntro();
  drawCardForPlayer();
  drawCardForOpponent();
  updateUI(playerCards, opponentCards, playerScore, opponentScore);
}

// Функция для взятия карты
export function drawCard() {
  if (!playerTurn) return; // Если не ваш ход, не даем взять карту
  drawCardForPlayer();

  if (playerScore > 21) {
    endGame(); // Если перебрали очки, завершаем игру
  } else {
    updateUI(playerCards, opponentCards, playerScore, opponentScore);
  }
}

// Функция начала новой игры
export function newGame() {
  startGame();
  // Воспроизведение звука при взятии карты
  playCardSound();

  document.querySelector(".result").innerText = "";
  document
    .querySelector(".result")
    .classList.replace("result-visible", "result-hidden");
}

// Передача хода противнику
export function passTurn() {
  playerTurn = false;
  revealFirstOpponentCard();
}

// Открытие первой карты противника
function revealFirstOpponentCard() {
  flippedCardsOpponent[0] = false;
  updateUI(playerCards, opponentCards, playerScore, opponentScore);

  // Воспроизведение звука при взятии карты
  playCardSound();

  setTimeout(() => {
    document.querySelector("#opponent-cards .card")?.classList.add("flipped");
    flippedCardsOpponent[0] = true;
    setTimeout(opponentTurnStep, 1500);
  }, 50);
}

// Ход противника
function opponentTurnStep() {
  if (opponentScore >= 16) {
    endGame();
    return;
  }

  drawCardForOpponent();
  updateUI(playerCards, opponentCards, playerScore, opponentScore);
  flipNextOpponentCard(0);
}

// Переворот карт противника
function flipNextOpponentCard(index) {
  if (index >= opponentCards.length) {
    opponentTurnStep();
    return;
  }

  setTimeout(() => {
    const cardEls = document.querySelectorAll("#opponent-cards .card");
    const cardEl = cardEls[index];

    if (cardEl) {
      cardEl.classList.add("flipped");
      flippedCardsOpponent[index] = true;
    }

    if (index + 1 < opponentCards.length) {
      setTimeout(() => flipNextOpponentCard(index + 1), 800);
    } else {
      setTimeout(opponentTurnStep, 900);
    }
  }, 500);
}

// Функция завершения игры
export function endGame() {
  let message = "";

  // В зависимости от результата, проигрывается соответствующий звук
  if (playerScore > 21) {
    message = "Вы проиграли!";
    playLoseSound();
  } else if (opponentScore > 21 || playerScore > opponentScore) {
    message = "Вы победили!";
    playWinSound();
  } else if (playerScore < opponentScore) {
    message = "Противник выиграл!";
    playLoseSound();
  } else {
    message = "Ничья!";
    playDrawSound();
  }


  // Отображаем сообщение о результате
  let resultElement = document.querySelector(".result");
  resultElement.innerText = message;
  resultElement.classList.remove("result-hidden");
  resultElement.classList.add("result-visible");
}
