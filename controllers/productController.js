const productService = require('../services/productService');

const getAll = async (_req, res) => { 
  const result = await productService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getById(id);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAll, getById };