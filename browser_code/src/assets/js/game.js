import * as Const from '../js/const';
// import blockly from '../components/blockly';
import * as Tool from '../js/gameTool';
export default class Game {
  constructor({
    map,
    direction,
    turtlePositionX,
    turtlePositionY,
    turtleDirection,
    frogPositionX,
    frogPositionY,
    leave
  }) {
    this.map = [...map];
    // this.map = map;
    this.direction = direction;
    this.turtlePosition = {
      x: 0,
      y: 0
    };
    this.turtlePosition.x = turtlePositionX;
    this.turtlePosition.y = turtlePositionY;
    this.turtleDirection = turtleDirection;
    this.position = {
      x: 0,
      y: 0
    };
    this.position.x = frogPositionX;
    this.position.y = frogPositionY;
    this.xyMoveNum = [];
    this.id = '';
    this.collect = 0;
    this.leave = [...leave];
  }

  isEnd(x, y) {
    let currentIndex = -1;
    this.leave.forEach((element, index ) => {
      if (element[0] === x && element[1] === y) {
        currentIndex = index;
      }
    });
    if (currentIndex >= 0) {
      if (!this.leave[currentIndex][2]) {
        this.collect ++;
        this.leave[currentIndex][2] = true;
      }

      return true;
    }

    return false;
  }
  isTouchTurtleAndRiver(x, y) {
    // 如果青蛙入河有乌龟，则能过
    if (
      this.map[x][y] === Const.RIVEREFLAG &&
      (x === this.turtlePosition.x && y === this.turtlePosition.y)
    ) {
      return false;
    }
    // 如果青蛙入河无乌龟，则不能过
    if (this.map[x][y] === Const.RIVEREFLAG) {
      return true;
    }
    // 如果青蛙未入河能过

    return false;
  }
  isTurtleOutRange(x, y) {
    if (
      Tool.isXOutofMap(x) ||
      Tool.isYOutofMap(y) ||
      this.map[x][y] === Const.STOONEEFLAG ||
      this.map[x][y] === Const.EMPTYFLAG ||
      this.map[x][y] === Const.PATHFLAG
    ) {
      return true;
    }

    return false;
  }
  isOutRange(x, y) {
    if (
      Tool.isXOutofMap(x) ||
      Tool.isYOutofMap(y) ||
      this.map[x][y] === Const.EMPTYFLAG ||
      this.map[x][y] === Const.STOONEEFLAG ||
      this.isTouchTurtleAndRiver(x, y)
    ) {
      return true;
    }

    return false;
  }

  isStone(direction) {
    let x = this.position.x;
    let y = this.position.y;
    x += Const.DIRECTIONMOVECHANGEX[direction][0];
    y += Const.DIRECTIONMOVECHANGEX[direction][1];
    if (this.map[x][y] === Const.STOONEEFLAG) {
      return true;
    }

    return false;
  }
  isFrogAlonePath(direction) {
    let x = this.position.x;
    let y = this.position.y;
    x += Const.DIRECTIONMOVECHANGEX[direction][0];
    y += Const.DIRECTIONMOVECHANGEX[direction][1];
    if (this.isOutRange(x, y)) {
      return false;
    }

    return true;
  }
  isPath(direction) {
    let x = this.position.x;
    let y = this.position.y;
    if (x === this.turtlePosition.x && y === this.turtlePosition.y) {
      x += Const.DIRECTIONMOVECHANGEX[direction][0];
      y += Const.DIRECTIONMOVECHANGEX[direction][1];
      // 当乌龟和青蛙在河上是有路的
      if (this.map[x][y] === Const.RIVEREFLAG) {
        return true;
      }

      return false;
    }
    x += Const.DIRECTIONMOVECHANGEX[direction][0];
    y += Const.DIRECTIONMOVECHANGEX[direction][1];
    if (this.isOutRange(x, y)) {
      return false;
    }

    return true;
  }

  isTwoSpacePath(direction) {
    let x = this.position.x;
    let y = this.position.y;
    x += Const.DIRECTIONMOVECHANGEX[direction][0];
    y += Const.DIRECTIONMOVECHANGEX[direction][1];
    x += Const.DIRECTIONMOVECHANGEX[direction][0];
    y += Const.DIRECTIONMOVECHANGEX[direction][1];
    if (this.isOutRange(x, y)) {
      return false;
    }

    return true;
  }
  touchEndPoint() {
    if (this.isEnd(this.position.x, this.position.y)) {
      this.xyMoveNum.push(Const.TOUCHENDFLAG);

      return true;
    }
    this.xyMoveNum.push(Const.NOTTOUCHENDFLAG);

    return false;
  }

  moveforward(id) {
    // 此时高亮block blockly.workspace.highlightBlock(id);
    this.id = id;

    if (this.isFrogAlonePath(this.direction)) {
      this.position.x += Const.DIRECTIONMOVECHANGEX[this.direction][0];
      this.position.y += Const.DIRECTIONMOVECHANGEX[this.direction][1];
      this.xyMoveNum.push(Const.DIRECTIONMOVECHANGEX[this.direction][1]);
      this.xyMoveNum.push(Const.DIRECTIONMOVECHANGEX[this.direction][0]);
      this.xyMoveNum.push(this.direction);
      this.xyMoveNum.push(this.turtleDirection);
      this.touchEndPoint();

      return true;
    }
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(this.direction);
    this.xyMoveNum.push(this.turtleDirection);
    this.xyMoveNum.push(Const.TOUCHWALLFLAG);
    // 抛出异常，此处无路
    throw new Error(Const.TOUCHWALLFLAG);

    // return false;
  }
  jump(id) {
    // 此时高亮block blockly.workspace.highlightBlock(id);
    this.id = id;
    // 前进两步本身就有路
    if (this.isTwoSpacePath(this.direction)) {
      this.position.x += Const.DIRECTIONMOVECHANGEX[this.direction][0];
      this.position.y += Const.DIRECTIONMOVECHANGEX[this.direction][1];
      this.position.x += Const.DIRECTIONMOVECHANGEX[this.direction][0];
      this.position.y += Const.DIRECTIONMOVECHANGEX[this.direction][1];
      this.xyMoveNum.push(2 * Const.DIRECTIONMOVECHANGEX[this.direction][1]);
      this.xyMoveNum.push(2 * Const.DIRECTIONMOVECHANGEX[this.direction][0]);
      this.xyMoveNum.push(this.direction);
      this.xyMoveNum.push(this.turtleDirection);
      this.touchEndPoint();

      return true;
    }

    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(this.direction);
    this.xyMoveNum.push(this.turtleDirection);
    this.xyMoveNum.push(Const.TOUCHWALLFLAG);
    // 抛出异常，此处无路
    throw new Error(Const.TOUCHWALLFLAG);
  }
  turnleft(id) {
    // if (this.isPath(this.changeDirectionToLeft(this.direction))) {

    // 此时高亮block blockly.workspace.highlightBlock(id);
    this.id = id;
    this.direction = Tool.changeDirectionToLeft(this.direction);
    // 此时把图片改成向左转
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(this.direction);
    this.xyMoveNum.push(this.turtleDirection);
    this.touchEndPoint();

    return true;
  }
  turnright(id) {
    // 此时高亮block blockly.workspace.highlightBlock(id);
    this.id = id;
    this.direction = Tool.changeDirectionToRight(this.direction);
    // 此时把图片改成向右转
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(this.direction);
    this.xyMoveNum.push(this.turtleDirection);
    this.touchEndPoint();

    return true;
  }
  turnback(id) {
    this.id = id;
    // 两次右转为向后转
    this.direction = Tool.changeDirectionToRight(this.direction);
    this.direction = Tool.changeDirectionToRight(this.direction);

    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(this.direction);
    this.xyMoveNum.push(this.turtleDirection);
    this.touchEndPoint();

    return true;
  }
  isPathForward() {
    return this.isPath(this.direction);
  }
  isPathLeft() {
    const direction = Tool.changeDirectionToLeft(this.direction);

    return this.isPath(direction);
  }
  isPathRight() {
    const direction = Tool.changeDirectionToRight(this.direction);

    return this.isPath(direction);
  }
  isStoneForward() {
    return this.isStone(this.direction);
  }
  turtleTouchEnd() {
    if (
      this.isEnd(this.turtlePosition.x, this.turtlePosition.y)
    ) {
      this.xyMoveNum.push(Const.TURTLEANDFROGTOUCHENDFLAG);

      return true;
    }
    this.xyMoveNum.push(Const.TURTLEANDFROGNOTTOUCHENDFLAG);

    return false;
  }
  isTurtlePath(direction) {
    let x = this.turtlePosition.x;
    let y = this.turtlePosition.y;
    x += Const.DIRECTIONMOVECHANGEX[direction][0];
    y += Const.DIRECTIONMOVECHANGEX[direction][1];
    if (this.isTurtleOutRange(x, y)) {
      return false;
    }

    return true;
  }
  touchTurtle() {
    if (
      this.position.x === this.turtlePosition.x &&
      this.position.y === this.turtlePosition.y
    ) {
      return true;
    }

    return false;
  }
  turtleForward(id) {
    this.id = id;
    if (this.isTurtlePath(this.turtleDirection)) {
      // 乌龟没碰到墙，正常移动
      const tempPositionX = this.turtlePosition.x;
      const tempPositionY = this.turtlePosition.y;
      this.turtlePosition.x +=
        Const.DIRECTIONMOVECHANGEX[this.turtleDirection][0];
      this.turtlePosition.y +=
        Const.DIRECTIONMOVECHANGEX[this.turtleDirection][1];
      this.xyMoveNum.push(Const.DIRECTIONMOVECHANGEX[this.turtleDirection][1]);
      this.xyMoveNum.push(Const.DIRECTIONMOVECHANGEX[this.turtleDirection][0]);
      this.xyMoveNum.push(this.direction);
      this.xyMoveNum.push(this.turtleDirection);
      // 乌龟与青蛙绑定则要判定是否到终点，同时移动青蛙,注意青蛙与乌龟方向一致
      if (
        tempPositionX === this.position.x &&
        tempPositionY === this.position.y
      ) {
        // this.direction = this.turtleDirection;
        this.position.x += Const.DIRECTIONMOVECHANGEX[this.turtleDirection][0];
        this.position.y += Const.DIRECTIONMOVECHANGEX[this.turtleDirection][1];
        // 青蛙和乌龟共同判断终点，到终点则停下
        this.turtleTouchEnd();

        return true;
      }
      // 乌龟一个不用判断终点，直接添行进信息就行
      this.xyMoveNum.push(Const.TURTLEMOVEFLAG);

      return true;
    }
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(this.direction);
    this.xyMoveNum.push(this.turtleDirection);
    // 乌龟如果和青蛙绑定，那么就运行终止,并且乌龟和青蛙方向应该一样
    if (this.touchTurtle()) {
      // this.direction = this.turtleDirection;
      this.xyMoveNum.push(Const.TURTLEANDFROGTOUCHWALLFLAG);
      // 抛出异常，此处无路
      throw new Error(Const.TOUCHWALLFLAG);
    }
    // 乌龟如果和青蛙不绑定，那么就只有乌龟不动，运行不终止
    this.xyMoveNum.push(Const.TURTLETOUCHWALLFLAG);

    return false;
  }
  turtleLeft() {
    this.turtleDirection = Tool.changeDirectionToLeft(this.turtleDirection);
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(Const.NOTMOVE);
    // 乌龟和青蛙绑定方向
    if (this.touchTurtle()) {
      // this.direction = this.turtleDirection;
      this.direction = Tool.changeDirectionToLeft(this.direction);
      this.xyMoveNum.push(this.direction);
      this.xyMoveNum.push(this.turtleDirection);
      this.xyMoveNum.push(Const.TURTLEANDFROGNOTTOUCHENDFLAG);

      return true;
    }
    this.xyMoveNum.push(this.direction);
    this.xyMoveNum.push(this.turtleDirection);
    this.xyMoveNum.push(Const.TURTLEMOVEFLAG);

    return true;
  }
  turtleRight() {
    this.turtleDirection = Tool.changeDirectionToRight(this.turtleDirection);
    this.xyMoveNum.push(Const.NOTMOVE);
    this.xyMoveNum.push(Const.NOTMOVE);

    // 乌龟和青蛙绑定方向
    if (this.touchTurtle()) {
      // this.direction = this.turtleDirection;
      this.direction = Tool.changeDirectionToRight(this.direction);
      this.xyMoveNum.push(this.direction);
      this.xyMoveNum.push(this.turtleDirection);

      this.xyMoveNum.push(Const.TURTLEANDFROGNOTTOUCHENDFLAG);

      return true;
    }
    this.xyMoveNum.push(this.direction);
    this.xyMoveNum.push(this.turtleDirection);
    this.xyMoveNum.push(Const.TURTLEMOVEFLAG);

    return true;
  }
}
// </script>
