var jsc = require('jsverify');

function abs(n) {
  if (n < 0) {
    return -n;
  }

  return n;
}

jsc.check(
  jsc.forall("nat", function (n) {
    return abs(n) === n;
  })
);

jsc.check(
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

function ifPersonLike(value, personlikeCallback, otherwiseCallback) {
  if (value.name && value.age && value.address) {
    return personlikeCallback(value);
  }

  return otherwiseCallback(value);
} 

var validPerson = jsc.record({
  name: jsc.string,
  age: jsc.nat,
  address: jsc.string
});

var examplePersonCallback = jsc.fn(validPerson, );

var ifpersonlike_invokes_the_first_callback_given_a_person =

  jsc.forall(
    validPersonType
    , function (v) {
    console.log(v); 
    return true;
  });

jsc.assert(
  ifpersonlike_invokes_the_first_callback_given_a_person
);
