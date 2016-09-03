describe('errorToStatusCode()', () => {
  var subject,
   ValidationError;

  beforeEach(() => {
    subject = require('../src/ex2Decisions.js').errorToStatusCode;
    ValidationError = require('../src/ex2Decisions.js').ValidationError;
    ErrorWithStatus = require('../src/ex2Decisions.js').ErrorWithStatus;
  });

  describe('given null', () => {
    it('returns a 500', () => {
      expect(subject(null)).toBe(500);
    });
  });

  describe('given undefined', () => {
    it('returns a 500', () => {
      expect(subject(undefined)).toBe(500);
    });
  });

  describe('given a string containing the phrase "not found"', () => {
    it('returns a 404', () => {
      expect(subject('The foo you requested was not found.')).toBe(404);
    });
  });

  describe('given a validation error', () => {
    it('returns a 400', () => {
      expect(subject(new ValidationError('The foo you provided was not valid'))).toBe(400);
    });
  });

  describe('given an error that is status aware', () => {
    it(`returns the error's status`, () => {
      expect(subject(new ErrorWithStatus('...', 403))).toBe(403);
    });
  });

  describe('given an error that is an object with a type of PaymentNotIncluded', () => {
    it(`returns a 402`, () => {
      expect(subject({ type: 'PaymentNotIncluded' })).toBe(402);
    });
  });
});
