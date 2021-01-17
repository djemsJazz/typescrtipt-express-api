/* eslint-disable array-callback-return */
import isNumber from './isNumber';

describe('isNumber Util', () => {
  it('Its a Number', () => {
    [0, 1, 2, -1, 1.345e17, '1'].map((n) => {
      expect(isNumber(n)).toEqual(true);
    });
  });

  it('Its not a number', () => {
    [false, NaN, [], {}, '1a'].map((n) => {
      expect(isNumber(n)).toEqual(false);
    });
  });
});
