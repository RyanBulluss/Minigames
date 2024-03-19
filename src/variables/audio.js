import flap from "../assets/flap.mp3";
import hit from "../assets/hit.mp3";
import point from "../assets/point.mp3";
import swipe from "../assets/swipe.mp3";
import combine from "../assets/combine.mp3";

const volume = 0.1;

const playAudio = (sound) => {
  return () => {
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
  };
};

const flapAudio = new Audio(flap);
const hitAudio = new Audio(hit);
const pointAudio = new Audio(point);
const swipeAudio = new Audio(swipe);
const combineAudio = new Audio(combine);

const flapSound = playAudio(flapAudio);
const hitSound = playAudio(hitAudio);
const pointSound = playAudio(pointAudio);
const swipeSound = playAudio(swipeAudio);
const combineSound = playAudio(combineAudio);

export { flapSound, hitSound, pointSound, swipeSound, combineSound };
