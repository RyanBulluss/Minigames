import React from "react";

const Message = ({ score, board, startGame }) => {
  return (
    <div
      style={{
        position: "absolute",
        height: board.height,
        width: board.width,
      }}
      className="bg-black/90 z-50 flex flex-col justify-center items-center gap-4 sm:gap-16 text-2xl sm:text-4xl font-bold text-center"
    >
      {score.player !== 0 || score.cpu !== 0 ? (
        <>
          {score.player > score.cpu ? <h2>You Win!</h2> : <h2>You Lose!</h2>}
          <div>
            <h2>You: {score.player}</h2>
            <br />
            <h2>Cpu: {score.cpu}</h2>
          </div>
          <button className="hover:text-gray-400" onClick={startGame}>
            Play Again
          </button>
        </>
      ) : (
        <button className="hover:text-gray-400" onClick={startGame}>
          Start game
        </button>
      )}
    </div>
  );
};

export default Message;
