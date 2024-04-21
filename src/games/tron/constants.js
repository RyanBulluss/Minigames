const boardWidth = 20;
const boardHeight = 20;

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
        state[boardHeight / 2][boardWidth - 5] = i;
        players[i] = {
            y: boardHeight / 2,
            x: boardWidth - 5,
            direction: "left",
            dead: false,
        }
    }

    return [state, players];
}


export { createState, boardHeight, boardWidth }