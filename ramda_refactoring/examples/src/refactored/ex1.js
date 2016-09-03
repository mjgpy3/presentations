const R = require('ramda');

const getViews = R.pipe(
  R.filter(R.has('views')),
  R.map(R.prop('views'))
);

module.exports.getViews = getViews;
