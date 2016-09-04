function setSpecies(species, pokemon) {
  var newPokemon = shallowClone(pokemon);

  newPokemon.species = { name:  species };

  return newPokemon;
}

function addSpeciesMetadata(metadata, pokemon) {
  var newPokemon = shallowClone(pokemon);
  var newSpecies = shallowClone(newPokemon.species);

  newPokemon.species = newSpecies;

  for (var metadataKey in metadata) {
    newPokemon.species[metadataKey] = metadata[metadataKey];
  }

  return newPokemon;
}

function getSpecies(pokemon) {
  return pokemon.species.name;
}

function shallowClone(pokemon) {
  var result = {};

  for (var someKey in pokemon) {
    result[someKey] = pokemon[someKey];
  }

  return result;
}

module.exports = {
  setSpecies: setSpecies,
  getSpecies: getSpecies,
  addSpeciesMetadata: addSpeciesMetadata
};
