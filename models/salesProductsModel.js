const connection = require('./connection');

const getAll = async () => { 
  const [rows] = connection.execute('SELECT * FROM StoreManager.sales_products;');
  return rows;
};

const create = async (saleId, productId, quantity) => { 
  const [rows] = connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return rows;
};

module.exports = { getAll, create };