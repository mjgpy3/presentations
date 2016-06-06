var jsc = require('jsverify');

function abs(n) {
  if (n < 0) {
    return -n;
  }

  return n;
}

jsc.assert(
  jsc.forall("nat", function (n) {
    return abs(n) === n;
  })
);

jsc.assert(
  jsc.forall("nat", function (n) {
    return abs(-n) === n;
  })
);

var abs_is_always_positive =
  jsc.forall('number', function (n) {
    return abs(n) >= 0;
  });

jsc.assert(
  abs_is_always_positive
);

var abs_is_idempotent =

  jsc.forall('number', function (n) {
    return abs(abs(n)) === abs(n);
  });

jsc.assert(
  abs_is_idempotent
);

function fizzbuzz(n, divBy3, divBy5, divBy15, otherwise) {
  if (n%15 === 0) {
    return divBy15(n);
  }

  if (n%3 === 0) {
    return divBy3(n);
  }

  if (n%5 === 0) {
    return divBy5(n);
  }

  return otherwise(n);
}

/*
for (var i = 1; i < 101; i += 1) {
  fizzbuzz(
    i,
    function () { console.log('Fizz'); },
    function () { console.log('Buzz'); },
    function () { console.log('FizzBuzz'); },
    function (n) { console.log(n); }
  )
}
*/

var divisibleBy15 = jsc.nat.generator.map(
  function (n) { return n * 15; }
);

var divisibleBy15 = jsc.bless({
  generator: function () {
    return jsc.random(0, 999999999) * 15;
  }
});

function any() {
  throw new Error('An ignored function was called!');
}

jsc.assert(
  jsc.forall(divisibleBy15, 'nat -> json', function (n, cb) {
    return fizzbuzz(n, any, any, cb, any) === cb(n);
  })
);

var divisibleBy3Not5 = jsc.bless({
  generator: function () {
    var result = jsc.random(0, 999999999) * 3;

    if (result % 5 == 0) {
      return result + 3;
    }

    return result;
  }
});

jsc.assert(
  jsc.forall(divisibleBy3Not5, 'nat -> json', function (n, cb) {
    return fizzbuzz(n, cb, any, any, any) === cb(n);
  })
);

var notDivisibleBy3Or5 = jsc.bless({
  generator: function () {
    var result = jsc.random(0, 999999999);

    while (result % 5 === 0 || result % 3 === 0) {
      result += 1;
    }

    return result;
  }
});

jsc.assert(
  jsc.forall(notDivisibleBy3Or5, 'nat -> json', function (n, cb) {
    return fizzbuzz(n, any, any, any, cb) === cb(n);
  })
);
