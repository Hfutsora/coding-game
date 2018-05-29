function turnDirect(direct) {
  let frogImage = 'frog-right.png';
  if (direct === 0) {
    frogImage = 'frog-top.png';
  }
  if (direct === 1) {
    frogImage = 'frog-right.png';
  }
  if (direct === 2) {
    frogImage = 'frog-bottom.png';
  }
  if (direct === 3) {
    frogImage = 'frog-left.png';
  }

  return frogImage;
}

export {
  turnDirect
};
