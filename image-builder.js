const fs = require('fs');
const DataURI = require('datauri').sync;

const path = './src/data/images/hi_res';

const getPokemonImage = (id) => {
  return DataURI(`${path}/${id}.png`);
};

module.exports = {
  getPokemonImage
};