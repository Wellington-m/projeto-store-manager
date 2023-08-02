const saleService = require('../services/saleService');

const ERROR_MESSAGE = 'Server error';

const getAll = async (_req, res) => {
  try {
    const result = await saleService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await saleService.getById(id);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const create = async (req, res) => {
  const products = req.body;
  const result = await saleService.create(products);
  return res.status(201).json(result);
};

module.exports = { create, getAll, getById };
