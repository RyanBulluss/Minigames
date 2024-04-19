import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBomb,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

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
        <div className='flex justify-center items-center'>
          {obj.isRevealed && obj.isMine && <FontAwesomeIcon icon={faBomb} />}
          {!obj.isRevealed && obj.isFlagged && <FontAwesomeIcon icon={faFlag} />}
        <p style={{ color: obj.isRevealed ? "rgba(255, 255, 255, 1)" : "rgba(100, 100, 100, 0)", userSelect: "none" }}>


        {obj.isRevealed && !obj.isMine && obj.adjacentMines > 0 && obj.adjacentMines }
        {!obj.isRevealed && !obj.isFlagged && "R"}
        </p>

        </div>
        
    </div>
  )
}

export default GameCell