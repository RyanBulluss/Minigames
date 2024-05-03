const basicColTemplate = [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0, 0,]

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
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,"breakable" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,"question" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,"breakable" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,"coin" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", "pipe", 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,"coin" ,0 ,0 ,0 ,0 ,0 ,0 ,0 , "top pipe",],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", "brick", 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", "brick", "brick", 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", "brick", "brick", "brick", 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", "brick", "brick", "brick", "brick" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", "brick", "brick", "brick", "brick" ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    ["grass", 0, 0, 0, 0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,"brick" ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
    [0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 0,],
];



function createCols(n, type) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push([type, type, type, type, type ,type ,type ,type ,type ,type ,type ,type ,type ,type ,type ,type ,type ,type ,type , type])
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

function flatGrassStairs() {
    let newL = flatGrass();
    newL = addStairs(newL, "brick", 3, 1, 7);
    newL[13][13] = "coin";
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




const levels = [level1, flatGrass(), flatGrassStairs(), poleJumps()];


export { level1, levels }