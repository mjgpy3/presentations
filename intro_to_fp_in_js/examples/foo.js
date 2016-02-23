(function () {
  var mod = {};

mod.parents = function (person) {
  var results = [];

  if (person.father !== null) {
    results.push(person.father);
  }
  if (person.mother !== null) {
    results.push(person.mother);
  }

  return results;
};

mod.grandparents = function (person, nGreat) {
  var currentLevel = mod.parents(person),
    nextLevel;

  for (; nGreat !== -1; nGreat--) {
    nextLevel = [];

    currentLevel.forEach(function (current) {
      var parents = mod.parents(current);

      nextLevel = nextLevel.concat(parents);
    });

    currentLevel = nextLevel;
  }

  return nextLevel;
};

mod.path = function (person, selectors) {
  for (var i = 0; i < selectors.length; i += 1) {
    if (person === null || person[selectors[i]] === null) {
      return null;
    }

    person = person[selectors[i]];
  }

  return person;
};

var a2 = {
  name: 'Foo',
  father: null,
  mother: null
};

var a = {
  name: 'Foo',
  father: null,
  mother: null
};

var b = {
  name: 'Bar',
  father: a,
  mother: null
};

var c = {
  name: 'Baz',
  father: b,
  mother: null
};

console.log(mod.path(c, ['mother']));
})();
