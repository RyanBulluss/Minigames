const gameSpeed = 50;
const boardWidth = 24;
const boardHeight = 21;

const snakeStartPosition = [
  [10, 1],
  [10, 0],
];
const snakeStartLength = 2;

function createState() {
  let newState = [];
  for (let i = 0; i < boardHeight; i++) {
    let row = [];
    for (let j = 0; j < boardWidth; j++) {
      row.push({
        snake: false,
        head: false,
        food: false,
      });
    }
    newState.push(row);
  }
  snakeStartPosition.forEach((arr) => (newState[arr[0]][arr[1]].snake = true));
  newState[10][12].food = true;
  newState[8][10].food = true;
  newState[8][14].food = true;
  newState[12][10].food = true;
  newState[12][14].food = true;
  return newState;
}

export {
  boardHeight,
  boardWidth,
  gameSpeed,
  createState,
  snakeStartLength,
  snakeStartPosition,
};
