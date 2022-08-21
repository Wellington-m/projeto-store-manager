const connection = require('./connection');

const getAll = async () => { 
  const [rows] = await connection.execute('SELECT * FROM StoreManager.sales;');
  return rows;
};

module.exports = { getAll };