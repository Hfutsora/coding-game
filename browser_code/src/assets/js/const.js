export const ROWNUM = 6;
export const COLUMNNUM = 8;
// 东南西北四个方向值
export const NORTHNUM = 0;
export const EASTNUM = 1;
export const SOUTHNUM = 2;
export const WESTNUM = 3;
export const DIRECTIONSIZE = 4;
// 地图值标注，空(无路位置)，开始位置，有路位置，结束位置，乌龟位置，石头位置
export const EMPTYFLAG = 0;
export const STARTFLAG = 6;
export const ENDFLAG = 7;
export const TURTLEFLAG = 4;
// 路值
export const PATHFLAG = 1;
// 石头值
export const STOONEEFLAG = 2;
// 河流值
export const RIVEREFLAG = 3;
export const DIRECTIONMOVECHANGEX = [
  // [0, 1], [1, 0], [0, -1], [-1, 0]
  [-1, 0], [0, 1], [1, 0], [0, -1]
];
export const TURNLEFTCHANGENUM = -1;
export const TURNRIGHTCHANGENUM = 1;
export const NOTMOVE = 0;
export const GRIDTOPPX = [0, 76, 152, 228, 304, 380];
export const GRIDLEFTPX = [0, 76, 152, 228, 304, 380, 456, 532];
// 青蛙的四个行为串
export const TOUCHWALLFLAG = '青蛙碰到墙了';
export const AREADYTOUCHENDFLAG = '青蛙已经通过成功';
export const TOUCHENDFLAG = '青蛙通过成功';
export const NOTTOUCHENDFLAG = '青蛙还没到终点';
// 青蛙和乌龟的三个行为串
export const TURTLEANDFROGTOUCHWALLFLAG = '青蛙和乌龟碰到墙了';
// export const TURTLEANDFROGAREADYTOUCHENDFLAG = '青蛙和乌龟已经通过成功';
export const TURTLEANDFROGTOUCHENDFLAG = '青蛙和乌龟通过成功';
export const TURTLEANDFROGNOTTOUCHENDFLAG = '青蛙和乌龟还没到终点';
// 乌龟的四个行为串
export const TURTLETOUCHWALLFLAG = '乌龟碰到墙了';
export const TURTLEMOVEFLAG = '乌龟在动';
// 乌龟的id
export const TURTLE = 'turtle';
// 青蛙的id
export const FROG = 'frog';
// 石头的id
export const STONE = 'stone';
// 河流的id
export const RIVER = 'river';
// 路的id
export const PATH = 'path';
// 终点的id
export const LEAVE = 'leaves';

export const blocklyName = ['action-forward', 'action-turnright', 'action-jump', 'controls_repeat', 'action-if', 'action-ifElse', 'action-turtle', 'action-turnback', 'action-turnleft'];
