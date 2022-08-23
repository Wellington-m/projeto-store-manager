const connection = require('./connection');

const getById = async (id) => { 
  const [rows] = await connection.execute(`
  SELECT 
    sales.date, sales_products.product_id AS productId, sales_products.quantity
  FROM 
    StoreManager.sales_products
  INNER JOIN
    StoreManager.sales
  ON StoreManager.sales.id = StoreManager.sales_products.sale_id
  WHERE StoreManager.sales_products.sale_id = ?;`, [id]);
  return rows;
};

const getAll = async () => { 
  const [rows] = await connection.execute(`
  SELECT 
    sales_products.sale_id AS saleId,
    sales.date,
    sales_products.product_id AS productId,
    sales_products.quantity
  FROM 
    StoreManager.sales_products
  INNER JOIN StoreManager.sales
  ON StoreManager.sales.id = StoreManager.sales_products.sale_id;`);
  return rows;
};

const create = async () => {
  const date = new Date().toISOString().replace('T', ' ').slice(0, -5);
  const [rows] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?);', [date],
  );
  return rows;
};

module.exports = { getAll, create, getById };