const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

const getAll = async () => { 
  const result = await salesModel.getAll();

  // const { sale_id: saleId, date, product_id: productId, quantity } = result;
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

module.exports = { create, getAll };