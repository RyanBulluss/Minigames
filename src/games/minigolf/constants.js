class Wall {
  constructor(height, width, y, x, moving) {
    this.type = "wall";
    this.height = height;
    this.width = width;
    this.y = y;
    this.x = x;
    this.moving = moving ? true : false;
    this.speed = 3000;
  }
}

class Piece {
  constructor(type, size, y, x) {
    this.type = type;
    this.height = size;
    this.width = size;
    this.y = y;
    this.x = x;
    this.shake = 0;
  }
}

const level1 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2),
  hole: new Piece("hole", 20, 4, 2),
};

const level2 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(40, 4, 2, 2.7),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2),
  hole: new Piece("hole", 20, 4, 2),
};

const level3 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(40, 4, 2, 2.7, true),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2),
  hole: new Piece("hole", 20, 4, 2),
};

const level4 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(1.5, 20, 3.5, 2.1),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2.5),
  hole: new Piece("hole", 20, 1.2, 1.65),
};

const level5 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(2, 20, 2.4, 2.1),
    new Wall(20, 5, 2.5, 2.5),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2.5),
  hole: new Piece("hole", 20, 1.2, 1.65),
};


const level6 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
    new Wall(20, 6, 1.8, 3.8),
    new Wall(20, 6, 1.8, 1.75),
    new Wall(20, 4, 2.5, 2.7),
  ],
  ball: new Piece("ball", 40, 1.2, 2),
  hole: new Piece("hole", 20, 4, 2),
};

const level7 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(40, 4, 1.8, 4, true),
    new Wall(40, 4, 2.5, 2.1, true),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2),
  hole: new Piece("hole", 20, 4, 2),
};

const level8 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(40, 8, 1.4, 4, true),
    new Wall(40, 8, 1.65, 3.6, true),
    new Wall(40, 8, 2, 3.2, true),
    new Wall(40, 8, 2.5, 2.9, true),
    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2),
  hole: new Piece("hole", 20, 4, 2),
};

const level9 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(40, 3, 1.4, 4),
    new Wall(40, 3, 1.8, 2.5),
    new Wall(40, 3, 2.5, 4),

    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2),
  hole: new Piece("hole", 20, 4, 2),
};

const level10 = {
  walls: [
    new Wall(1.2, 20, 10, 1.43),
    new Wall(1.2, 20, 10, 4),
    new Wall(40, 3, 1.4, 4),
    new Wall(40, 3, 2.5, 2.5),
    new Wall(40, 5, 1.8, 3, true),

    new Wall(20, 2, 10, 4),
    new Wall(20, 2, 1.1, 4),
  ],
  ball: new Piece("ball", 40, 1.2, 2),
  hole: new Piece("hole", 20, 4, 2),
};

const level11 = {
  walls: [
    new Wall(1.2, 20, 10, 1.133),
    new Wall(1.2, 20, 10, 10),

    new Wall(40, 1.8, 2.8, 10),
    new Wall(40, 1.8, 1.85, 3),
    new Wall(40, 1.8, 1.4, 10),

    new Wall(20, 1.2, 10, 10),
    new Wall(20, 1.2, 1.1, 10),
  ],
  ball: new Piece("ball", 40, 1.2, 4),
  hole: new Piece("hole", 20, 4, 4),
};

const level12 = {
  walls: [
    new Wall(1.2, 20, 10, 1.133),
    new Wall(1.2, 20, 10, 10),
    
    // new Wall(40, 1.8, 2.8, 10),
    new Wall(2.3, 40, 3.5, 1.585),
    new Wall(4, 40, 3.5, 2.5),
    
    new Wall(40, 4, 3.5, 2.5),
    new Wall(40, 1.8, 1.4, 10),
    
    new Wall(20, 1.2, 10, 10),
    new Wall(20, 1.2, 1.1, 10),
  ],
  ball: new Piece("ball", 40, 1.2, 4),
  hole: new Piece("hole", 20, 2.5, 1.9),
};

const level13 = {
  walls: [
    new Wall(1.2, 20, 10, 1.133),
    new Wall(1.2, 20, 10, 10),
    
    new Wall(1.8, 40, 10, 3.2),
    new Wall(1.8, 40, 2.8, 2),
    new Wall(1.8, 40, 10, 1.45),
    
    new Wall(20, 1.2, 10, 10),
    new Wall(20, 1.2, 1.1, 10),
  ],
  ball: new Piece("ball", 40, 4, 4.4),
  hole: new Piece("hole", 20, 4, 1.25),
};

const level14 = {
  walls: [
    new Wall(1.2, 20, 10, 1.133),
    new Wall(1.2, 20, 10, 10),

    new Wall(40, 1.8, 2.8, 10),
    new Wall(40, 1.8, 1.85, 3),
    new Wall(40, 1.8, 1.4, 10),

    new Wall(8, 40, 1.5, 1.55),
    new Wall(8, 40, 2.05, 3),
    new Wall(8, 40, 3.25, 1.55),

    new Wall(20, 1.2, 10, 10),
    new Wall(20, 1.2, 1.1, 10),
  ],
  ball: new Piece("ball", 40, 1.2, 4),
  hole: new Piece("hole", 20, 4, 4),
};

const level15 = {
  walls: [
    new Wall(1.2, 20, 10, 1.133),
    new Wall(1.2, 20, 10, 10),

    new Wall(40, 1.8, 3.5, 10),
    new Wall(40, 1.8, 2.3, 3),
    new Wall(40, 1.8, 1.7, 10),
    new Wall(40, 1.8, 1.35, 3),


    new Wall(20, 1.2, 10, 10),
    new Wall(20, 1.2, 1.1, 10),
  ],
  ball: new Piece("ball", 40, 1.19, 1.25),
  hole: new Piece("hole", 20, 4.5, 4.5),
};

// const levels = [level15, level15];
const levels = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, level11, level12, level13, level14, level15];

// {
//     type: "wall",
//     height: newBoard.height / 20,
//     width: newBoard.width / 2,
//     y: newBoard.y + newBoard.height / 2 - newBoard.height / 40,
//     x: newBoard.x + newBoard.width / 4,
//   }

export { levels };
