function returnBlocks(blocklies) {
  const blocks = [];
  for (let j = 0, len = blocklies.length; j < len; j ++) {
    if (blocklies[j] === 1) {
      blocks.push('action-forward');
    }
    if (blocklies[j] === 2) {
      blocks.push('action-turnright');
    }
    if (blocklies[j] === 3) {
      blocks.push('action-jump');
    }
    if (blocklies[j] === 4) {
      blocks.push('controls_repeat');
    }
    if (blocklies[j] === 5) {
      blocks.push('action-if');
    }
    if (blocklies[j] === 6) {
      blocks.push('action-ifElse');
    }
    if (blocklies[j] === 7) {
      blocks.push('action-turtle');
    }
    if (blocklies[j] === 8) {
      blocks.push('action-turnback');
    }
    if (blocklies[j] === 9) {
      blocks.push('action-turnleft');
    }
  }

  return blocks;
}

export {
  returnBlocks
};