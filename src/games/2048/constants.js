const board = {
    height: 4,
    width: 4,
}

function rng(num) {
    return Math.floor(Math.random() * num);
}

function newNumber() {
    if (Math.floor(Math.random()) > 0.8) return 4;
    return 2;
}

function createState() {
    const boardSize = board.height * board.width;
    const arr = [];
    for (let i = 0; i < boardSize; i++) {
        arr.push(0);
    }
    

    return arr;
}

export { board, createState }