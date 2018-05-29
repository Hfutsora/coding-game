
import * as Const from '../js/const';
const mapItem = id => {
  if (id.find(Const.PATH)) {
    return Const.PATHFLAG;
  }
  if (id.find(Const.STONE)) {
    return Const.STOONEEFLAG;
  }
  if (id.find(Const.RIVER)) {
    return Const.RIVEREFLAG;
  }

  return false;
};
const mapXandY = index => {
  const position = [];
  const x = index / Const.COLUMNNUM;
  // 从0开始
  position.push(x);
  // 从1开始
  const y = index % Const.ROWNUM;
  position.push(y);

  return position;
};
export default {
  mapItem,
  mapXandY
};
