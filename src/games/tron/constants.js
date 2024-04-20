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
    state[0][0] = numOfPlayers;

    return state;
}

export { createState }