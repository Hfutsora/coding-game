import * as Const from '../js/const';
export function changeDirectionToLeft(direction) {
  if (direction === Const.NORTHNUM) {
    direction = Const.WESTNUM;
  }
  else {
    direction += Const.TURNLEFTCHANGENUM;
  }

  return direction;
}
export function changeDirectionToRight(direction) {
  direction = (direction + Const.TURNRIGHTCHANGENUM) %
  Const.DIRECTIONSIZE;

  return direction;
}
export function isXOutofMap(x) {
  if (x < 0 || x > Const.ROWNUM - 1) {
    return true;
  }

  return false;
}
export function isYOutofMap(y) {
  if (y < 0 || y > Const.COLUMNNUM - 1) {
    return true;
  }

  return false;
}
export function initMap(map) {
  const mapArray = [];
  for (let i = 0; i < Const.ROWNUM; i ++) {
    const arrayItem = [];
    for (let j = 0; j < Const.COLUMNNUM; j ++) {
      arrayItem.push( parseInt(map[( i * Const.COLUMNNUM ) + j]));
    }
    mapArray.push( arrayItem );
  }

  // leave.forEach(element => {
  //   mapArray[element.x - 1][element.y - 1] = Const.ENDFLAG;
  // });

  // for (let i = 0; i < leave.length; i ++) {
  // mapArray[leave[i][0]][leave[i][1]] = Const.ENDFLAG;
  // }

  return mapArray;
}
