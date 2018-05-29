import * as Const from '@/assets/js/const';
import * as game from '@/assets/js/gameTool';

describe('gameTool.js', () => {
  // 向左改变方向（四个方向）
  it('左转返回方向函数', () => {
    expect(game.changeDirectionToLeft(Const.NORTHNUM)).toBe(Const.WESTNUM);
    expect(game.changeDirectionToLeft(Const.EASTNUM)).toBe(Const.NORTHNUM);
    expect(game.changeDirectionToLeft(Const.SOUTHNUM)).toBe(Const.EASTNUM);
    expect(game.changeDirectionToLeft(Const.WESTNUM)).toBe(Const.SOUTHNUM);
  });
  // 向右改变方向（四个方向）
  it('右转返回方向函数', () => {
    expect(game.changeDirectionToRight(Const.NORTHNUM)).toBe(Const.EASTNUM);
    expect(game.changeDirectionToRight(Const.EASTNUM)).toBe(Const.SOUTHNUM);
    expect(game.changeDirectionToRight(Const.SOUTHNUM)).toBe(Const.WESTNUM);
    expect(game.changeDirectionToRight(Const.WESTNUM)).toBe(Const.NORTHNUM);
  });
  // x超出范围 -1 0 6
  it('X超出函数', () => {
    expect(game.isXOutofMap(-1)).toBe(true);
    expect(game.isXOutofMap(Const.ROWNUM)).toBe(true);
    expect(game.isXOutofMap(Const.ROWNUM - 1)).toBe(false);
    expect(game.isXOutofMap(0)).toBe(false);
    expect(game.isXOutofMap(3)).toBe(false);
  });
  // y超出范围 -1 0 8
  it('Y超出函数', () => {
    expect(game.isYOutofMap(-1)).toBe(true);
    expect(game.isYOutofMap(Const.COLUMNNUM)).toBe(true);
    expect(game.isYOutofMap(Const.COLUMNNUM - 1)).toBe(false);
    expect(game.isYOutofMap(0)).toBe(false);
    expect(game.isYOutofMap(3)).toBe(false);
  });
});

