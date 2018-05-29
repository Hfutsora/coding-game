import * as returnBlockly from '@/assets/js/returnBlocks';

describe('test returnBlocks', () => {
  it('test return empty', () => {
    const result = returnBlockly.returnBlocks([]);
    expect(result.length).toBe(0);
  });
  it('test return all', () => {
    const result = returnBlockly.returnBlocks([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(result).toEqual(['action-forward', 'action-turnright', 'action-jump', 'controls_repeat', 'action-if', 'action-ifElse', 'action-turtle', 'action-turnback', 'action-turnleft']);
  });
});
