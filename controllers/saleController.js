const saleService = require('../services/saleService');

const getAll = async (_req, res) => { 
  const result = await saleService.getAll();
  return res.status(200).json(result);
};

const create = async (req, res) => {
  const products = req.body;
  const result = await saleService.create(products);
  return res.status(201).json(result);
};

module.exports = { create, getAll };