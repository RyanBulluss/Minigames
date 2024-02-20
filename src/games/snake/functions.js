function checkNextPosition(position, direction) {
  switch (direction) {
    case "UP":
      position[0]--;
      break;
    case "DOWN":
      position[0]++;
      break;
    case "LEFT":
      position[1]--;
      break;
    case "RIGHT":
      position[1]++;
      break;
  }
  return position;
}

function rng(n) {
    return Math.floor(Math.random() * n);
}

export { checkNextPosition, rng };
