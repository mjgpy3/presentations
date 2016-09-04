const R = require('ramda');

const speciesLens = R.lensProp('species');
const nameLens = R.lensProp('name');
const speciesNameLens = R.compose(speciesLens, nameLens);

const setSpecies = R.set(speciesNameLens);

function addSpeciesMetadata(metadata, pokemon) {
  return R.over(speciesLens, R.merge(metadata), pokemon);
}

const getSpecies = R.view(speciesNameLens);

module.exports = {
  setSpecies: setSpecies,
  getSpecies: getSpecies,
  addSpeciesMetadata: addSpeciesMetadata
};
