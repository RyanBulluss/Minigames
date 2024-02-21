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
    let green = false;

    guesses.forEach((arr, idx) => {
      arr.forEach((c, wIdx) => {
        if (c === key && idx < currentGuess) guessed = true;
        if (c === key && idx < currentGuess && word[wIdx] === key) green = true;
      });
    });

    if (green) return "rgb(83, 141, 78)";
    if (guessed && word.includes(key)) return "rgb(181, 159, 59)";
    if (guessed) return "#444";
  }

  return (
    <div className="py-2 md:py-4">
      {querty.map((row) => (
        <div className="flex justify-center">
          {row.split("").map((key) => (
            <button
              onClick={() => handleKeyPress(key)}
              className="m-px flex h-[4vmin] w-[4vmin] text-[2vmin] items-center justify-center bg-gray-400 rounded-md font-semibold uppercase"
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
          className="flex h-[4vmin] px-2 text-[2vmin] items-center justify-center rounded-md bg-gray-400 font-semibold uppercase"
        >
          DELETE
        </button>
        {!playing && (
          <button
            onClick={handleStartGame}
            className="flex h-[4vmin] text-[2vmin] px-2 md:px-3 items-center justify-center rounded-md bg-third font-semibold uppercase"
          >
            Start Game
          </button>
        )}
        <button
          onClick={handleEnter}
          className="flex h-[4vmin] px-2 text-[2vmin] items-center justify-center rounded-md bg-gray-400 font-semibold uppercase"
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

export default Querty;
