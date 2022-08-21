const saleService = require('../services/saleService');

const create = async (req, res) => {
  const products = req.body;
  const result = await saleService.create(products);
  return res.status(201).json(result);
};

module.exports = { create };