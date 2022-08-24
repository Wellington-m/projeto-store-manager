const productService = require('../services/productService');

const ERROR_MESSAGE = 'Server error';

const getAll = async (_req, res) => {
  try {
    const result = await productService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getById(id);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await productService.create(name);
    return res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

module.exports = { getAll, getById, create };