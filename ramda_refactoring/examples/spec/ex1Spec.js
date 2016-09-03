describe('getCounts()', () => {
  var subject;

  beforeEach(() => {
    subject = require('../src/ex1SimpleLoops.js').getCounts;
  });

  describe('given an empty array', () => {
    it('returns an empty array', () => {
      expect(subject([])).toEqual([]);
    });
  });

  describe('given an array with no objects that have counts', () => {
    it('returns an empty array', () => {
      expect(subject([{}, {}, {}])).toEqual([]);
    });
  });

  describe('given an array with counts of 0', () => {
    it('returns 0', () => {
      expect(subject([{ counts: 0 }])).toEqual([0]);
    });
  });

  describe('given an array with some counts', () => {
    const array = [
      {},
      { counts: 99 },
      {},
      { counts: 41 }
    ];

    it('returns just those counts', () => {
      expect(subject(array)).toEqual([
        99,
        41
      ]);
    });
  });
});
