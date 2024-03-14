
const board = {
    height: 4,
    width: 4,
}

function rng(num) {
    return Math.floor(Math.random() * num);
}

function newNumber() {
    if (Math.random() > 0.8) return 4;
    return 2;
}

function spawnNewNumber(oldState) {
    const arr = oldState;
    let valid = false;
    while (!valid) {
        let y = rng(board.height);
        let x = rng(board.width);
        if (arr[y][x] === 0) {
            arr[y][x] = newNumber();
            valid = true;
        }
    }
    return arr;
}

function createState() {
    let arr = [];
    for (let i = 0; i < board.height; i++) {
        let row = [];
        for (let j = 0; j < board.width; j++) {
            row.push(0);
        }
        arr.push(row);
    }
    arr = spawnNewNumber(arr);
    arr = spawnNewNumber(arr);

    return arr;
}


export { board, createState, spawnNewNumber }