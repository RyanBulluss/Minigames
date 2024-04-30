class GamePiece {
  constructor(type, y, x, height, width) {
    this.type = type;
    this.y = y;
    this.x = x;
    this.height = height;
    this.width = width;
  }
}

const gravity = 2000;


export { GamePiece, gravity };
