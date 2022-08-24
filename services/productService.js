const productModel = require('../models/productModel');

const getAll = async () => { 
  const result = await productModel.getAll();
  return result;
};

const getById = async (id) => { 
  const result = await productModel.getById(id);
  return result;
};

const create = async (name) => {
  const result = await productModel.create(name);
  return result;
};

const update = async (name, id) => { 
  const result = await productModel.update(name, id);
  if (result.affectedRows === 0) return false;
  return true;
};

module.exports = { getAll, getById, create, update };