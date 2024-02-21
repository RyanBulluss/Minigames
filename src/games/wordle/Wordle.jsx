import { useState, useEffect } from "react";
import React from "react";
import WordleControls from "./WordleControls";
import { wordList } from "./constants";
import GuessRow from "./GuessRow";
import Querty from "./Querty";

const Wordle = () => {
  const [playing, setPlaying] = useState(false);
  const [word, setWord] = useState(null);
  const [guesses, setGuesses] = useState([[], [], [], [], [], []]);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  
  function handleStartGame() {
    setWord(wordList[Math.floor(Math.random() * wordList.length)]);
    setPlaying(true);
    setGuesses([[], [], [], [], [], []]);
    setCurrentGuess(0);
    setMessage("");
    setTimer(0);
  }

  useEffect(() => {
    if (!playing) return;
    if (!word) return;
    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, word]);

  function handleWin() {
    setPlaying(false);
    setMessage(`You guessed the word in ${timer} seconds!`);
    
    // add leaderboard logic here
  }

  function handleLoss() {
    setPlaying(false);
    setMessage(`The word was ${word.toUpperCase()}. Try again!`);
    setTimer(0);
  }

  function handleEnter() {
    if (!playing) return;
    if (guesses[currentGuess].length < 5) return;
    setCurrentGuess(currentGuess + 1);
    if (guesses[currentGuess].join("") === word) return handleWin();
    if (currentGuess + 1 > 5) return handleLoss();
  }

  function handleDelete() {
    if (!playing) return;
    setGuesses((g) => {
      const newG = g.map((a) => [...a]);
      if (newG[currentGuess].length > 0) {
        newG[currentGuess].pop();
      }
      return newG;
    });
  }

  function handleKeyPress(key) {
    if (!playing) return;
    if (guesses[currentGuess].length > 4) return;

    const newGuesses = [...guesses];

    newGuesses[currentGuess].push(key);
    setGuesses(newGuesses);
  }

  return (
    <div className="h-full w-full flex flex-col">
      <WordleControls timer={timer} />
      <div className="h-[80vmin] bg-gray-600">
        <div className="flex flex-col gap-2 justify-center items-center h-full">
          <h1 className="text-2xl uppercase">wordle</h1>
          <div className="h-8">
            <h3>{message}</h3>
          </div>

          {guesses.map((guess, idx) => (
            <GuessRow
              key={idx}
              guess={guess}
              word={word}
              showColor={currentGuess !== idx}
            />
          ))}
          <Querty
            handleKeyPress={handleKeyPress}
            handleEnter={handleEnter}
            handleDelete={handleDelete}
            handleStartGame={handleStartGame}
            playing={playing}
            guesses={guesses}
            word={word}
            currentGuess={currentGuess}
          />
        </div>
      </div>
    </div>
  );
};

export default Wordle;