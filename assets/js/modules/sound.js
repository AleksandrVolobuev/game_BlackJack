// Получение элементов аудио
const golosSound = document.getElementById("golos-sound");
const cardSound = document.getElementById("card-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");
const metalSound = document.getElementById("metal-sound");

function playGolosSound() {
 golosSound.play();
}
function playCardSound() {
  cardSound.play();
}

function playWinSound() {
  winSound.play();
} 

function playLoseSound() {
  loseSound.play();
}

function playDrawSound() {
  drawSound.play();
}

function playMetalSound() {
  metalSound.play();
}

function playMusicIntro(){
 
  document.getElementById('bg-music').addEventListener('click', () => {
    const music = document.getElementById('background-music');
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  });
 
}



export { playGolosSound, playCardSound, playWinSound, playLoseSound, playDrawSound, playMetalSound , playMusicIntro};

