import Game from '../js/game';
// import * as Const from '../js/const';
import * as gameTool from '../js/gameTool';
import * as Const from '../js/const';

export default class ConnectGame {
  constructor({
    leave,
    map,
    frogDirection,
    turtlePositionX,
    turtlePositionY,
    turtleDirection,
    frogPositionX,
    frogPositionY
  }) {
    this.leave = leave;
    const maps = gameTool.initMap(map);
    leave = [];
    // false代表叶子没被碰到过
    this.leave.forEach(element => {
      const Item = [element.x - 1, element.y - 1, false];
      leave.push(Item);
    });

    map = [...maps];
    const direction = frogDirection;
    this.game = new Game({
      map,
      direction,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY,
      leave
    });
  }
  calculateStar() {
    const collect = this.game.collect;
    const fullMarks = this.leave.length;
    // 五星级，等于原本的四叶草长度100%
    if (collect >= fullMarks) {
      return 5;
    }
    else if (collect >= fullMarks * 0.8) {
      // 四星级，等于80%
      return 4;
    }
    else if (collect >= fullMarks * 0.6) {
      // 三星级，等于60%
      return 3;
    }
    else if (collect >= fullMarks * 0.3) {
      // 二星级，等于30%
      return 2;
    }
    else if (collect > 0) {
      // 一星级，不为0
      return 1;
    }
    // 0星级，为0

    return 0;
  }
  runCode(code) {
    try {
      // eslint-disable-next-line
      eval(code);
    }
    catch (error) {
      // 此处仅为了阻止eval运行
    }
    // 每次四个值为单位，分别是x相对位f移，y相对位移，当前方向，错误/成功信息。
    // （左右转是0,0,转向后方向，‘未到终点’）
    const resultPosition = this.game.xyMoveNum;
    if (
      resultPosition[resultPosition.length - 1] === Const.TOUCHWALLFLAG ||
      resultPosition[resultPosition.length - 1] ===
        Const.TURTLEANDFROGTOUCHWALLFLAG ||
      resultPosition[resultPosition.length - 1] === Const.TURTLETOUCHWALLFLAG
    ) {
      resultPosition.push(0);
    }
    else {
      resultPosition.push(this.calculateStar());
    }

    return resultPosition;
  }
}
