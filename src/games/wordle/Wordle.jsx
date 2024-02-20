import { useState } from "react";
import React from "react";
import WordleControls from "./WordleControls";
import { wordList } from "./constants";

const Wordle = () => {
  const [playing, setPlaying] = useState(false);
  const [word, setWord] = useState(null);
  const [guess, setGuess] = useState("");
  

  function handleStartGame() {
    setPlaying(true)
    setWord(wordList[Math.floor(Math.random() * wordList.length)]);
  }

  return (
    <div className="h-full w-full flex flex-col">
      <WordleControls />
      <div className="h-[80vmin] bg-gray-600">
        {!playing && (
          <div className="flex justify-center items-center h-full">
            <button onClick={handleStartGame} className="bg-third px-3 py-2 text-2xl rounded-2xl">Start</button>
          </div>
        )}
          <div className="flex justify-center items-center h-full">
            {word}
          </div>
      </div>
    </div>
  );
};

export default Wordle;
