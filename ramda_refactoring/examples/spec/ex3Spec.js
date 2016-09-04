describe('example: pokemon', () => {
  const getPokemon = require('./example3.js').getPokemon;

  describe('setSpecies()', () => {
    var subject;

    beforeEach(() => {
      subject = require('../src/ex3Lenses.js').setSpecies;
    });

    describe('given a new species name', () => {
      var originalPokemon;

      beforeEach(() => {
        originalPokemon = getPokemon();

        subject = subject(originalPokemon, 'foobar');
      });

      it('sets the new species name on the returned value', () => {
        expect(subject.species.name).toBe('foobar');
      });

      it('carries forward the original properties', () => {
        delete subject.species;
        delete originalPokemon.species;
        expect(subject).toEqual(originalPokemon);
      });

      it('does not mutate the original, passed pokemon', () => {
        expect(originalPokemon.species.name).toBe('bulbasaur');
      });
    });
  });

  describe('getSpecies()', () => {
    var subject;

    beforeEach(() => {
      subject = require('../src/ex3Lenses.js').getSpecies;
    });

    it(`returns the pokemon's species name`, () => {
      expect(subject(getPokemon())).toBe('bulbasaur');
    });
  });

  describe('addSpeciesMetadata()', () => {
    var originalPokemon;

    beforeEach(() => {
      subject = require('../src/ex3Lenses.js').addSpeciesMetadata;
    });

    beforeEach(() => {
      originalPokemon = getPokemon();

      subject = subject(originalPokemon, { foo: 'bar', spaz: 'eggs' });
    });

    it('keeps the original pokemon species name', () => {
      expect(subject.species.name).toBe('bulbasaur');
    });

    it('associates the new data into the original pokemon species object', () => {
      expect(subject.species.foo).toBe('bar');
      expect(subject.species.spaz).toBe('eggs');
    });

    it('carries forward the original properties on the root pokemon object', () => {
      delete subject.species;
      delete originalPokemon.species;
      expect(subject).toEqual(originalPokemon);
    });

    it('does not mutate the original, passed pokemon', () => {
      expect(originalPokemon.species.name).toBe('bulbasaur');
    });
  });
});
