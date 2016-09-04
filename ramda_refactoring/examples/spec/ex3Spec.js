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

        subject = subject('foobar', originalPokemon);
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
    var originalPokemon,
      fn;

    beforeEach(() => {
      fn = require('../src/ex3Lenses.js').addSpeciesMetadata;
    });

    beforeEach(() => {
      originalPokemon = getPokemon();

      subject = fn({ foo: 'bar', spaz: 'eggs' }, originalPokemon);
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

    describe('when even more metadata is attached', () => {
      var firstResult;
      beforeEach(() => {
        firstResult = subject;
        subject = fn({ a: 'b', c: 'd' }, subject);
      });

      it('does not modify the first result', () => {
        expect(firstResult.species.a).not.toBeDefined();
      });

      it('keeps the original keys', () => {
        expect(firstResult.species.name).toBe('bulbasaur');
      });

      it('keeps the metadata keys added on the first call', () => {
        expect(firstResult.species.foo).toBe('bar');
      });

      it('associates the new data into the pokemon species object', () => {
        expect(subject.species.a).toBe('b');
        expect(subject.species.c).toBe('d');
      });
    });
  });
});
