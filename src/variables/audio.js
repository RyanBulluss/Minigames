import flap from "../assets/flap.mp3";
import hit from "../assets/hit.mp3";
import point from "../assets/point.mp3";
import swipe from "../assets/swipe.mp3";
import combine from "../assets/combine.mp3";
import pop from "../assets/pop.mp3";
import pop2 from "../assets/pop2.mp3";
import gameOver from "../assets/game-over.mp3";
import bomb from "../assets/bomb.mp3";
import win from "../assets/win.mp3";
import jetpack from "../assets/jetpack.mp3";
import spring from "../assets/spring.mp3";
import snap from "../assets/snap.mp3";
import gunshot from "../assets/gunshot.mp3";
import cannon from "../assets/cannon.mp3";
import sniper from "../assets/sniper.mp3";
import zombieHit from "../assets/zombieHit.mp3";
import zombieBite from "../assets/zombieBite.mp3";

const volume = 0.01;

const playAudio = (sound) => {
  return () => {
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
  };
};

const playAudioNoSkip = (mp3) => {
  return () => {
    const newAudio = new Audio(mp3);
    newAudio.volume = volume;
    if (newAudio.currentTime === 0) {
      newAudio.play();
    }
  };
};

const flapAudio = new Audio(flap);
const hitAudio = new Audio(hit);
const pointAudio = new Audio(point);
const swipeAudio = new Audio(swipe);
const combineAudio = new Audio(combine);
const popAudio = new Audio(pop);
const pop2Audio = new Audio(pop2);
const gameOverAudio = new Audio(gameOver);
const bombAudio = new Audio(bomb);
const winAudio = new Audio(win);
const jetpackAudio = new Audio(jetpack);
const springAudio = new Audio(spring);
const snapAudio = new Audio(snap);

const flapSound = playAudio(flapAudio);
const hitSound = playAudio(hitAudio);
const pointSound = playAudio(pointAudio);
const swipeSound = playAudio(swipeAudio);
const combineSound = playAudio(combineAudio);
const popSound = playAudio(popAudio);
const pop2Sound = playAudio(pop2Audio);
const gameOverSound = playAudio(gameOverAudio);
const bombSound = playAudio(bombAudio);
const winSound = playAudio(winAudio);
const springSound = playAudio(springAudio);
const jetpackSound = playAudio(jetpackAudio);
const snapSound = playAudio(snapAudio);

const gunshotSound = playAudioNoSkip(gunshot);
const cannonSound = playAudioNoSkip(cannon);
const sniperSound = playAudioNoSkip(sniper);
const zombieHitSound = playAudioNoSkip(zombieHit);

export {
  flapSound,
  hitSound,
  pointSound,
  swipeSound,
  combineSound,
  popSound,
  pop2Sound,
  gameOverSound,
  bombSound,
  winSound,
  springSound,
  jetpackSound,
  snapSound,
  gunshotSound,
  cannonSound,
  sniperSound,
  zombieHitSound,
};
