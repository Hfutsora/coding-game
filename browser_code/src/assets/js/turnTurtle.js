function turnTurtle(direct) {
  let turtleImage = 'turtle-right.png';
  if (direct === 0) {
    turtleImage = 'turtle-top.png';
  }
  if (direct === 1) {
    turtleImage = 'turtle-right.png';
  }
  if (direct === 2) {
    turtleImage = 'turtle-bottom.png';
  }
  if (direct === 3) {
    turtleImage = 'turtle-left.png';
  }

  return turtleImage;
}

export {
  turnTurtle
};
