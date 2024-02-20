
const boardSize = 30;

function createState() {
    let newState = [];
    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push({
                snake: false,
                head: false,
                food: false,
            })
        }
        newState.push(row);
    }
    return newState;
}

export {
    boardSize, createState
}