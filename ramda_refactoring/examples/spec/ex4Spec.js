describe('getViews()', () => {
  var subject;

  beforeEach(() => {
    subject = require('../src/ex4WritingIt.js').getViews;
  });

  describe('given an empty array', () => {
    it('returns an empty array', () => {
      expect(subject([])).toEqual([]);
    });
  });

  describe('given an array with no objects that have views', () => {
    it('returns an empty array', () => {
      expect(subject([{}, {}, {}])).toEqual([]);
    });
  });

  describe('given an array with views of 0', () => {
    it('returns 0', () => {
      expect(subject([{ views: 0 }])).toEqual([0]);
    });
  });

  describe('given an array with some views', () => {
    const array = [
      {},
      { views: 99 },
      {},
      { views: 41 }
    ];

    it('returns just those views', () => {
      expect(subject(array)).toEqual([
        99,
        41
      ]);
    });
  });
});
