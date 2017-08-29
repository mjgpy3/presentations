const prop = property => object => object[property];
const has = property => object => property in object;

const map = f => values => values.map(f);

const filter = predicate => values => values.filter(predicate);

const id = x => x;

const pipe2 = (f, g) => x => g(f(x));

const pipe = function () {
  return [].slice.call(arguments).reduce(pipe2, id);
};

const getViews = pipe(
  filter(has('views')),
  map(prop('views'))
);

module.exports.getViews = getViews;
