var _ = require('lodash');

function Just(v) {
  this.thenDo = function (f) {
    return f(v);
  };

  this.asList = [v];
}

function Nothing() {
  this.thenDo = function (_) {
    return new Nothing();
  };

  this.asList = [];
}

function catOptionals(optionals) {
  return _.flatten(
    _.map(optionals, 'asList')
  );
}

var grandma = {
  name: 'Uma',
  father: new Nothing(),
  mother: new Nothing()
};

var grandpap = {
  name: 'Cletus',
  father: new Nothing(),
  mother: new Nothing()
};

var dad = {
  name: 'Roger',
  father: new Just(grandpap),
  mother: new Just(grandma)
};

var jim = {
  name: 'Jimmy',
  father: new Just(dad),
  mother: new Nothing()
};

function concatMap(f, items) {
  return _.flatten(
    _.map(items, f)
  );
}

Array.prototype.thenDo = function (f) {
  return _.flatten(this.map(f));
};

function parents(person) {
    return person.father.asList.concat(
      person.mother.asList
    );
}

function grandparents(person, nGreat) {
  if (nGreat === -2) {
    return person;
  }

  return parents(person)
    .thenDo(function (person) {
      return grandparents(person, nGreat-1);
    });
}

function path(person, selectors) {
  if (selectors.length === 0) {
    return new Just(person);
  }

  return person[selectors[0]].thenDo(function (parent) {
    return path(parent, _.drop(selectors, 1));
  });
}

console.log(parents(jim));
console.log('------------------');
console.log(grandparents(jim, 0));
console.log('------------------');
console.log(path(jim, ['father', 'mother']));
