const salesModel = require('../models/salesModel');
// const salesProductsModel = require('../models/salesProductsModel');

const create = async () => { 
  const result = await salesModel.create();
  console.log(result);
};

module.exports = { create };