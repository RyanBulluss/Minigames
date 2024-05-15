const basicColTemplate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0,]

function addStairs(arr, type, x, y, amount) {
    const newArr = [...arr];
    for (let i = 0; i < amount; i++) {
        for (let j = 0; j - 1 < i; j++) {
            newArr[i + x][j + y] = type;
        }
    }
    return newArr;
}

const level1 = [
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "question", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, "coin", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "pipe", 0, 0, 0, 0, 0, 0, 0, 0, 0, "coin", 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
];

const level2 = [
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, "coin", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "coin", 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "pipe", 0, 0, 0, 0, 0, 0, 0,0, 0, 0, "coin", "coin", 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "coin", "coin", 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "pipe", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick",0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
];

const level3 = [
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, "question", 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "breakable", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", "pipe", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", "pipe", 0, 0, 0, 0, 0, 0, 0,0, 0, 0, "coin", "coin", 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "coin", "coin", 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "question", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
];


function createCols(n, type) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push([type, type, type, type, type, type, type, type, type, type, type, type, type, type, type, type, type, type, type,  type])
    }
    return arr;
}


function flatGrass() {
    let newL = createCols(20, 0);
    for (let i = 0; i < 20; i++) {
        newL[i][0] = "grass";
    }
    return newL;
}

function flatBricks() {
    let newL = createCols(20, 0);
    for (let i = 0; i < 20; i++) {
        newL[i][0] = "brick";
    }
    return newL;
}

function flatBreakable() {
    let newL = createCols(20, 0);
    for (let i = 0; i < 20; i++) {
        newL[i][0] = "breakable";
    }
    return newL;
}

function flatGrassStairs() {
    let newL = flatGrass();
    newL = addStairs(newL, "brick", 3, 1, 7);
    newL[13][13] = "coin";
    return newL;
}

function fourPiranhas() {
    let newL = flatGrass();
    
    newL[5][1] = "pipe"
    newL[9][1] = "pipe"
    newL[13][1] = "pipe"
    newL[17][1] = "pipe"

    newL[5][8] = "coin"
    newL[5][9] = "coin"
    newL[6][8] = "coin"
    newL[6][9] = "coin"
    newL[13][8] = "coin"
    newL[13][9] = "coin"
    newL[14][8] = "coin"
    newL[14][9] = "coin"
    return newL;
}

function poleJumps() {
    let newL = createCols(20, 0);
    for (let i = 0; i < 18; i++) {
        if (i % 3 === 0) {
            for (let j = 0; j < i; j++) {
                newL[i][j] = "breakable";
            }
        }
    }
    return newL;
}

function questionSection() {
    let newL = flatGrass();
    newL[5][5] = "breakable";
    newL[6][5] = "breakable";
    newL[7][5] = "breakable";
    newL[8][5] = "breakable";
    newL[12][5] = "breakable";
    newL[13][5] = "breakable";
    newL[14][5] = "breakable";
    newL[15][5] = "breakable";
    newL[9][10] = "breakable";
    newL[10][10] = "question";
    newL[11][10] = "breakable";
    
    return newL;
}

function thwompField() {
    const newL = flatGrass();

    newL[6][10] = "thwomp";
    newL[10][10] = "thwomp";
    newL[14][10] = "thwomp";
    newL[18][10] = "thwomp";

    return newL
}

function nineCoins() {
    let newL = flatGrass();
    
    newL[5][14] = "breakable"
    newL[6][14] = "breakable"
    newL[7][14] = "breakable"
    newL[5][15] = "coin"
    newL[6][15] = "coin"
    newL[7][15] = "coin"
    newL[5][16] = "coin"
    newL[6][16] = "coin"
    newL[7][16] = "coin"
    newL[5][17] = "coin"
    newL[6][17] = "coin"
    newL[7][17] = "coin"




    newL[5][5] = "breakable"
    newL[6][5] = "breakable"
    newL[7][5] = "breakable"

    newL[12][10] = "breakable"
    newL[13][10] = "breakable"
    newL[14][10] = "breakable"

    return newL;
}

// to test performance with maxed out objects
function tunnel() {
    let newL = createCols(10, "breakable");
    for (let i = 0; i < 10; i++) {
        newL[i][0] = "grass";
        newL[i][1] = 0;
        newL[i][2] = 0;
    }

    return newL;
}




const levels = [level1, level2, level3, flatGrass(), flatGrass(), flatBreakable(), flatGrassStairs(), poleJumps(), questionSection(), fourPiranhas(), nineCoins(), flatBricks(), thwompField()];
// const levels = [thwompField()];


export { level1, levels }