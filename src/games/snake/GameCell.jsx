import React from "react";

const GameCell = ({ content, y, x }) => {
  const color = y % 2 === 0 ? (x % 2 === 0 ? 1 : 2) : x % 2 === 0 ? 2 : 1;

  return (
    <div className="">
      <div className={`snake-board-${color} h-full`}>
        {!content.snake && content.food && (
          <div className={"snake-food rounded-full h-full"}></div>
        )}
        {content.snake && <div className={"snake-body h-full"}></div>}
      </div>
    </div>
  );
};

export default GameCell;
