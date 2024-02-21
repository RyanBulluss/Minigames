import React from "react";

const Querty = ({
  handleKeyPress,
  handleDelete,
  handleEnter,
  handleStartGame,
  playing,
  guesses,
  currentGuess,
  word,
}) => {
  const querty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  function findColor(key) {
    if (!word) return;
    let guessed = false;
    let yellow = false;
    let green = false;

    guesses.forEach((arr, idx) => {
      arr.forEach((c, wIdx) => {
        if (c == key && idx < currentGuess) guessed = true;
        if (c == key && idx < currentGuess && word[currentGuess]) guessed = true;
      });
    });

    if (guessed && word.includes(key)) return "green";
    if (guessed) return "blue";
  }

  return (
    <div className="py-4">
      {querty.map((row) => (
        <div className="flex justify-center">
          {row.split("").map((key) => (
            <button
              onClick={() => handleKeyPress(key)}
              className="m-px flex h-8 w-8 items-center justify-center bg-gray-400 rounded-md font-semibold uppercase"
              style={{ backgroundColor: findColor(key) }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex justify-between py-2">
        <button
          onClick={handleDelete}
          className="flex h-8 w-16 items-center justify-center rounded-md bg-gray-400 font-semibold uppercase"
        >
          DELETE
        </button>
        {!playing && (
          <button
            onClick={handleStartGame}
            className="flex h-8 px-2 items-center justify-center rounded-md bg-gray-400 font-semibold uppercase"
          >
            Start Game
          </button>
        )}
        <button
          onClick={handleEnter}
          className="flex h-8 w-16 items-center justify-center rounded-md bg-gray-400 font-semibold uppercase"
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

export default Querty;
