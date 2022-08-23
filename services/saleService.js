const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

const getAll = async () => { 
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => { 
  const result = await salesModel.getById(id);
  return result;
};

const create = async (products) => { 
  const { insertId: saleId } = await salesModel.create();
  await Promise.all(
    products
      .map((product) => salesProductsModel.create(saleId, product.productId, product.quantity)),
  );
  const result = {
    id: saleId,
    itemsSold: [...products],
  };
  return result;
};

module.exports = { create, getAll, getById };