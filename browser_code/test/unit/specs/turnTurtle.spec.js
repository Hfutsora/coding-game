import * as turnTurtle from '@/assets/js/turnTurtle';

describe('test turnTurtle', () => {
  it('test turn top', () => {
    const result = turnTurtle.turnTurtle(0);
    expect(result).toBe('turtle-top.png');
  });
  it('test turn right', () => {
    const result = turnTurtle.turnTurtle(1);
    expect(result).toBe('turtle-right.png');
  });
  it('test turn bottom', () => {
    const result = turnTurtle.turnTurtle(2);
    expect(result).toBe('turtle-bottom.png');
  });
  it('test turn left', () => {
    const result = turnTurtle.turnTurtle(3);
    expect(result).toBe('turtle-left.png');
  });
});
