import React from 'react'

const GameCell = ({ obj, y, x, handleCellClick, handleRightClick }) => {
  return (
    <div
    onClick={() => handleCellClick(y, x)} 
    onContextMenu={(e) => handleRightClick(e, y, x)}
    style={{
        border: "1px solid black",
        backgroundColor: !obj.isRevealed ? "gray" : "",
        display: "flex", justifyContent: "center", alignItems: "center" 
    }}>
        <div style={{ borderRadius: "50%", height: "50%", width: "50%", backgroundColor: obj.isMine && obj.isRevealed ? "red" : !obj.isRevealed && obj.isFlagged ? "orange" : "", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: obj.isRevealed ? "rgba(255, 255, 255, 1)" : "rgba(100, 100, 100, 0)", userSelect: "none" }}>
        {obj.isRevealed && !obj.isMine && obj.adjacentMines > 0 && obj.adjacentMines }
        {!obj.isRevealed && "R"}
        </p>

        </div>
        
    </div>
  )
}

export default GameCell