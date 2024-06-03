class Wall {
    constructor(height, width, y, x) {
        this.type = "wall";
        this.height = height;
        this.width = width;
        this.y = y;
        this.x = x;
    }
}

class Piece {
    constructor(type, size, y, x) {
        this.type = type;
        this.height = size;
        this.width = size;
        this.y = y;
        this.x = x;
    }
}

const level1 = {
    walls:[
    new Wall(1.2, 20, 10, 1.42),
    new Wall(1.2, 20, 10, 4),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
    ],
    ball: new Piece("ball", 40, 1.5, 2),
    hole: new Piece("hole", 20, 4, 2)
}

// {
//     type: "wall",
//     height: newBoard.height / 20,
//     width: newBoard.width / 2,
//     y: newBoard.y + newBoard.height / 2 - newBoard.height / 40,
//     x: newBoard.x + newBoard.width / 4,
//   }

export {
    level1
}