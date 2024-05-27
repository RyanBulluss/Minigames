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

const level4 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "thwomp", 0,  0,],
    ["brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "thwomp", 0,  0,],
    ["brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    ["brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,],
];

const level5 = [
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", "brick", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, "question", 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", "brick", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", "brick", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ["grass", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
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

function hardJumps1() {
    let newL = createCols(20, 0);
    
    newL[0][0] = "brick";
    newL[6][4] = "brick";
    newL[10][0] = "brick";
    newL[11][0] = "brick";
    newL[10][1] = "brick";
    newL[11][1] = "brick";
    newL[10][2] = "brick";
    newL[11][2] = "brick";
    newL[10][3] = "brick";
    newL[11][3] = "brick";
    newL[10][4] = "brick";
    newL[11][4] = "brick";
    newL[10][5] = "pipe";
    newL[16][2] = "brick";
    newL[19][0] = "brick";


    return newL;
}

function hardJumps2() {
    let newL = createCols(20, 0);
    
    newL[0][0] = "brick";
    newL[6][4] = "brick";
    newL[9][9] = "brick";
    newL[14][2] = "brick";
    newL[19][0] = "brick";

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

function questionSection2() {
    let newL = flatGrass();
    newL[5][5] = "breakable";
    newL[6][5] = "breakable";
    newL[7][5] = "breakable";
    newL[8][5] = "platform";
    newL[9][5] = "platform";
    newL[10][5] = "platform";
    newL[11][5] = "platform";
    newL[12][5] = "platform";
    newL[13][5] = "breakable";
    newL[14][5] = "breakable";
    newL[15][5] = "breakable";
    newL[9][10] = "breakable";
    newL[10][10] = "question";
    newL[11][10] = "breakable";
    
    return newL;
}

function questionSection3() {
    let newL = [...flatGrass(), ...flatGrass()];
    newL[5][5] = "breakable";
    newL[6][5] = "breakable";
    newL[7][5] = "breakable";
    newL[8][5] = "platform";
    newL[9][5] = "platform";
    newL[10][5] = "platform";
    newL[11][5] = "platform";
    newL[12][5] = "platform";
    newL[13][5] = "platform";
    newL[14][5] = "platform";
    newL[15][5] = "platform";
    newL[16][5] = "platform";
    newL[17][5] = "breakable";
    newL[18][5] = "breakable";
    newL[19][5] = "breakable";
    newL[8][10] = "breakable";
    newL[9][10] = "question";
    newL[10][10] = "breakable";
    newL[14][10] = "breakable";
    newL[15][10] = "question";
    newL[16][10] = "breakable";
    
    return newL;
}

function questionSection4() {
    let newL = flatGrass();
    newL[5][5] = "breakable";
    newL[6][5] = "breakable";
    newL[7][5] = "breakable";
    newL[8][5] = "platform";
    newL[9][5] = "platform";
    newL[10][5] = "platform";
    newL[11][5] = "platform";
    newL[12][5] = "platform";
    newL[13][5] = "breakable";
    newL[14][5] = "breakable";
    newL[15][5] = "breakable";
    newL[9][10] = "question";
    newL[10][10] = "question";
    newL[11][10] = "question";
    
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

function thwompField2() {
    const newL = flatGrass();

    newL[3][10] = "thwomp";
    newL[8][1] = "pipe";
    newL[13][10] = "thwomp";
    newL[18][1] = "pipe";

    return newL
}

function thwompField3() {
    const newL = [...thwompField2(), ...thwompField2()];

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

function ladder1() {
    let newL = createCols(20, 0);
    
    newL[0][0] = "grass";
    newL[1][0] = "grass";
    newL[2][0] = "grass";
    newL[3][0] = "grass";
    
    newL[1][5] = "platform";
    newL[2][5] = "platform";
    newL[3][5] = "platform";
    newL[1][10] = "platform";
    newL[2][10] = "platform";
    newL[3][10] = "platform";

    newL[1][15] = "platform";
    newL[2][15] = "platform";
    newL[3][15] = "platform";
    newL[4][15] = "platform";
    newL[5][15] = "platform";
    newL[6][15] = "platform";
    newL[7][15] = "platform";
    newL[8][15] = "platform";
    newL[9][15] = "platform";
    newL[10][15] = "platform";
    newL[11][15] = "platform";
    newL[12][15] = "platform";
    newL[13][15] = "platform";
    newL[14][15] = "platform";
    newL[15][15] = "platform";

    newL[18][0] = "grass";
    newL[19][0] = "grass";


    return newL;
}

function ladder2() {
    let newL = [...flatGrass(), ...fourPiranhas()];

    newL[5][1] = "pipe";
    newL[5][8] = "platform";
    newL[6][8] = "platform";
    for (let i = 5; i < 35; i++) {
        newL[i][13] = "platform";
    }

    return newL;
}

function ladder3() {
    let newL = createCols(20, 0);

    newL[0][0] = "brick";
    newL[1][0] = "brick";
    newL[2][0] = "brick";
    newL[3][0] = "brick";
    newL[4][0] = "brick";
    newL[5][0] = "brick";
    newL[4][5] = "platform";
    newL[5][5] = "platform";
    
    newL[4][5] = "platform";
    newL[5][5] = "platform";

    newL[10][14] = "question";

    for (let i = 4; i < 14; i++) {
        newL[i][10] = "breakable";
    }

    return newL;
}

function ladder4() {
    let newL = createCols(20, 0);

    newL[0][0] = "brick";
    newL[1][0] = "brick";

    newL[0][5] = "brick";
    newL[1][5] = "brick";

    newL[0][10] = "brick";
    newL[1][10] = "brick";

    newL[2][8] = "coin";
    newL[2][13] = "coin";

    for (let i = 0; i < 14; i++) {
        newL[i][15] = "brick";
    }

    return newL;
}



const levels = [level1, level2, level3, level4, level5, ladder1(), ladder2(), ladder3(), ladder4(), hardJumps1(), hardJumps2(), flatGrass(), flatGrass(), flatGrass(), flatGrass(), flatBreakable(), flatGrassStairs(), poleJumps(), questionSection(), questionSection2(), questionSection3(), questionSection4(), fourPiranhas(), nineCoins(), flatBricks(), thwompField(), thwompField2(), thwompField3()];
// const levels = [thwompField3()];


export { level1, levels }