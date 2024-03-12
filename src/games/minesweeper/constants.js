const board = {
  height: 15,
  width: 15,
};

const minesAmount = 30;

const adjacents = [
  [1, 0],
  [1, 1],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];

function createState() {
  let newState = [];
  for (let i = 0; i < board.height; i++) {
    const row = [];
    for (let j = 0; j < board.width; j++) {
      row.push({
        isMine: false,
        isFlagged: false,
        isRevealed: false,
        adjacentMines: 0,
      });
    }
    newState.push(row);
  }
  newState = addMines(newState);
  newState = addAdjacents(newState);
  return newState;
}

function addMines(oldState) {
  const newState = oldState;
  for (let i = 0; i < minesAmount; i++) {
    let validPos = false;
    while (!validPos) {
      let y = rng(newState.length);
      let x = rng(newState[0].length);
      if (newState[y][x].isMine === false) {
        newState[y][x].isMine = true;
        validPos = true;
      }
    }
  }
  return newState;
}

function addAdjacents(oldState) {
  const newState = oldState;
  newState.forEach((arr, y) =>
    arr.forEach((obj, x) => {
      adjacents.forEach((adj) => {
        const newY = y + adj[0];
        const newX = x + adj[1];
        if (
          newY >= 0 &&
          newY < newState.length &&
          newX >= 0 &&
          newX < newState[0].length &&
          newState[newY][newX].isMine
        ) {
          newState[y][x].adjacentMines += 1;
        }
      });
    })
  );
  return newState;
}

function rng(n) {
  return Math.floor(Math.random() * n);
}

export { board, createState, adjacents };
