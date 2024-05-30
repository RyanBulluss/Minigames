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
import doubleSpeed from "../assets/double-speed.mp3";
import marioBrickBreak from "../assets/marioBrickBreak.mp3";
import marioBump from "../assets/marioBump.mp3";
import marioCoin from "../assets/marioCoin.mp3";
import marioDeath from "../assets/marioDeath.mp3";
import marioJump from "../assets/marioJump.mp3";
import marioJumpBig from "../assets/marioJumpBig.mp3";
import marioKill from "../assets/marioKill.mp3";
import marioPowerUp from "../assets/marioPowerUp.mp3";
import marioPowerDown from "../assets/marioPowerDown.mp3";
import marioPowerUpSpawn from "../assets/marioPowerUpSpawn.mp3";
import thwomp from "../assets/thwomp.mp3";



const volume = 0.03;

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

const thwompAudio = new Audio(thwomp);
const marioBrickBreakAudio = new Audio(marioBrickBreak);
const marioBumpAudio = new Audio(marioBump);
const marioCoinAudio = new Audio(marioCoin);
const marioDeathAudio = new Audio(marioDeath);
const marioJumpAudio = new Audio(marioJump);
const marioJumpBigAudio = new Audio(marioJumpBig);
const marioKillAudio = new Audio(marioKill);
const marioPowerUpAudio = new Audio(marioPowerUp);
const marioPowerDownAudio = new Audio(marioPowerDown);
const marioPowerUpSpawnAudio = new Audio(marioPowerUpSpawn);
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
const doubleSpeedAudio = new Audio(doubleSpeed);


const marioBumpSound = playAudioNoSkip(marioBump);
const thwompSound = playAudio(thwompAudio);
const marioBrickBreakSound = playAudio(marioBrickBreakAudio);
const marioCoinSound = playAudio(marioCoinAudio);
const marioDeathSound = playAudio(marioDeathAudio);
const marioJumpSound = playAudio(marioJumpAudio);
const marioJumpBigSound = playAudio(marioJumpBigAudio);
const marioKillSound = playAudio(marioKillAudio);
const marioPowerUpSound = playAudio(marioPowerUpAudio);
const marioPowerDownSound = playAudio(marioPowerDownAudio);
const marioPowerUpSpawnSound = playAudio(marioPowerUpSpawnAudio);
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
const doubleSpeedSound = playAudio(doubleSpeedAudio);

const gunshotSound = playAudioNoSkip(gunshot);
const cannonSound = playAudioNoSkip(cannon);
const sniperSound = playAudioNoSkip(sniper);

const zombieHitSound = () => {
  const newAudio = new Audio(zombieHit);
  newAudio.volume = 0.01;
  if (newAudio.currentTime === 0) {
    newAudio.play();
  }

};



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
  doubleSpeedSound,
  marioBrickBreakSound,
  marioBumpSound,
  marioCoinSound,
  marioDeathSound,
  marioJumpSound,
  marioJumpBigSound,
  marioKillSound,
  marioPowerUpSound,
  marioPowerDownSound,
  marioPowerUpSpawnSound,
  thwompSound
};
