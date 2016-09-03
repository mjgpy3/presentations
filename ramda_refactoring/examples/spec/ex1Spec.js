describe('incrementCounts()', () => {
  var subject;

  beforeEach(() => {
    subject = require('../src/ex1SimpleLoops.js').incrementCounts;
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
    it('returns counts of 1', () => {
      expect(subject([{ counts: 0 }])).toEqual([{ counts: 1 }]);
    });
  });

  describe('given an array with some counts', () => {
    const array = [
      {},
      { counts: 99 },
      {},
      { counts: 41 }
    ];

    it('returns just those counts with each incremented', () => {
      expect(subject(array)).toEqual([
        { counts: 100 },
        { counts: 42 }
      ]);
    });
  });
});
