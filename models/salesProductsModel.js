const connection = require('./connection');

const getAll = async () => { 
  const [rows] = connection.execute('SELECT * FROM StoreManager.sales_products;');
  return rows;
};