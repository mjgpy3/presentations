const R = require('ramda');

const errorToStatusCode = R.cond([
  [R.isNil, R.always(500)],
  [R.is(ErrorWithStatus), R.prop('status')],
  [R.is(ValidationError), R.always(400)],
  [R.propEq('type', 'PaymentNotIncluded'), R.always(402)],
  [R.test(/not found/i), R.always(404)],
  [R.always(true), R.always(500)]
]);
