
function checkBoundaries(board, obj) {
    const newObj = {...obj};
    const newX = obj.x + obj.xSpeed;
    const newY = obj.y + obj.ySpeed;
    if (newX + obj.width > board.x + board.width) {
        newObj.xSpeed = obj.xSpeed > 0 ? -obj.xSpeed : obj.xSpeed;
    };
    if (newX < board.x) {
        newObj.xSpeed = obj.xSpeed < 0 ? -obj.xSpeed : obj.xSpeed;
    };
    if (newY + obj.height > board.y + board.height) {
        newObj.ySpeed = obj.ySpeed > 0 ? -obj.ySpeed : obj.ySpeed;
    };
    if (newY < board.y) {
        newObj.ySpeed = obj.ySpeed < 0 ? -obj.ySpeed : obj.ySpeed;
    };
    return newObj;
}

function checkBorders(board, obj) {
    if (
        obj.x < board.x ||
        obj.y < board.y ||
        obj.x + obj.width > board.x + board.width ||
        obj.y + obj.height > board.y + board.height
    ) {
        return true;
    } return false;
}

function checkCollision(a, b) {
    if (
        a.x + a.width > b.x &&
        a.x < b.x + b.width &&
        a.y + a.height > b.y &&
        a.y < b.y + b.height
    ) return true;
    return false;
}

export { checkBoundaries, checkCollision, checkBorders }