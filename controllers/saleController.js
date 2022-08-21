const saleService = require('../services/saleService');

const create = async () => { 
  const result = await saleService.create();
  return result;
};

module.exports = { create };