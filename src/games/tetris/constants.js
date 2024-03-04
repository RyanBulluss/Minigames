const board = {
    height: 20,
    width: 10,
};

function createState() {
    let arr = [];
    for (let i = 0; i < board.height; i++) {
        let row = [];
        for (let j = 0; j < board.width; j++) {
            row.push(0);
        }
        arr.push(row);
    }
    return arr;
}

const pieces = {
    L: [
        0, 0, 1, 0,
        0, 0, 1, 0,
        0, 0, 1, 1, 
        0, 0, 0, 0, 

    ],
    J: [
        0, 0, 2, 0, 
        0, 0, 2, 0, 
        0, 2, 2, 0, 
        0, 0, 0, 0,
    ],
    T: [
        0, 0, 3, 0,
        0, 3, 3, 3, 
        0, 0, 0, 0, 
        0, 0, 0, 0, 
    ],
    I: [
        0, 0, 4, 0,
        0, 0, 4, 0,
        0, 0, 4, 0,
        0, 0, 4, 0,
    ],
    O: [
        0, 5, 5, 0,
        0, 5, 5, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ],
    S: [
        0, 0, 6, 6,
        0, 6, 6, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ],
    Z: [
        0, 7, 7, 0,
        0, 0, 7, 7,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ],
}

export { board, createState, pieces }