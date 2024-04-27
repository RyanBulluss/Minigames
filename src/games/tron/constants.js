const boardWidth = 50;
const boardHeight = 50;

const playersStart = {
    1: {
        direction: "down",
        y: boardHeight / 2,
        x: boardWidth - 3,
    },
    2: {
        direction: "up",
        y: boardHeight / 2,
        x: 2,
    },
    3: {
        direction: "right",
        y: 2,
        x: boardWidth / 2,
    },
    4: {
        direction: "left",
        y: boardHeight - 3,
        x: boardWidth / 2,
    },
}


function createState(numOfPlayers) {
    const state = [];
    for (let i = 0; i < boardHeight; i++) {
        const row = [];
        for (let j = 0; j < boardWidth; j++) {
            row.push(0);
        }
        state.push(row);
    }
    const players = {}
    for (let i = 1; i - 1 < numOfPlayers; i++) {
        players[i] = {
            y: playersStart[i].y,
            x: playersStart[i].x,
            direction: playersStart[i].direction,
            lastDirection: playersStart[i].direction,
            dead: false,
        }
    }

    return [state, players];
}


export { createState, boardHeight, boardWidth }