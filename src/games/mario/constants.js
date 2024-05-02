class GamePiece {
  constructor(type, y, x, height, width) {
    this.type = type;
    this.y = y;
    this.x = x;
    this.height = height;
    this.width = width;
  }
}

class Npc {
  constructor(type, y, x, height, width) {
    this.type = type;
    this.y = y;
    this.x = x;
    this.height = height;
    this.width = width;
    this.ySpeed = 0;
    this.xSpeed = 0;
    this.dead = false;
  }
}

const gravity = 1500;


export { GamePiece, Npc, gravity };
