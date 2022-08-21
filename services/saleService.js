const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

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

module.exports = { create };