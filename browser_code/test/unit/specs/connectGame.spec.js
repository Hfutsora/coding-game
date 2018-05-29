import ConnectGame from '@/assets/js/connectGame';
import * as Const from '@/assets/js/const';

describe('test connectGame', () => {
  const leave = [{
    x: 1,
    y: 1
  }, {
    x: 2,
    y: 3
  }, {
    x: 2,
    y: 4
  }, {
    x: 4,
    y: 3
  }, {
    x: 2,
    y: 6
  }];
  const map = [0, 1, 2, 0, 0];
  const frogDirection = 1;
  const turtlePositionX = 4;
  const turtlePositionY = 5;
  const turtleDirection = 1;
  const frogPositionX = 5;
  const frogPositionY = 5;

  it('test calculateStar 0', () => {
    const game = new ConnectGame({
      leave,
      map,
      frogDirection,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY
    });
    game.game.collect = 0;
    const result = game.calculateStar();
    expect(result).toBe(0);
  });

  it('test calculateStar 1', () => {
    const game = new ConnectGame({
      leave,
      map,
      frogDirection,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY
    });
    game.game.collect = 1;
    const result = game.calculateStar();
    expect(result).toBe(1);
  });

  it('test calculateStar 2', () => {
    const game = new ConnectGame({
      leave,
      map,
      frogDirection,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY
    });
    game.game.collect = 2;
    const result = game.calculateStar();
    expect(result).toBe(2);
  });

  it('test calculateStar 3', () => {
    const game = new ConnectGame({
      leave,
      map,
      frogDirection,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY
    });
    game.game.collect = 3;
    const result = game.calculateStar();
    expect(result).toBe(3);
  });

  it('test calculateStar 4', () => {
    const game = new ConnectGame({
      leave,
      map,
      frogDirection,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY
    });
    game.game.collect = 4;
    const result = game.calculateStar();
    expect(result).toBe(4);
  });

  it('test calculateStar 5', () => {
    const game = new ConnectGame({
      leave,
      map,
      frogDirection,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY
    });
    game.game.collect = 5;
    const result = game.calculateStar();
    expect(result).toBe(5);
  });

  it('test runcode', () => {
    const game = new ConnectGame({
      leave,
      map,
      frogDirection,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY
    });
    game.game.xyMoveNum = [Const.TOUCHWALLFLAG];
    const result = game.runCode('5+5');
    expect(result[result.length - 1]).toBe(0);
  });

  it('test runcode', () => {
    const game = new ConnectGame({
      leave,
      map,
      frogDirection,
      turtlePositionX,
      turtlePositionY,
      turtleDirection,
      frogPositionX,
      frogPositionY
    });
    game.game.collect = 5;
    game.game.xyMoveNum = [Const.TOUCHENDFLAG];
    const result = game.runCode('5+5');
    expect(result[result.length - 1]).not.toBe(0);
  });
});
