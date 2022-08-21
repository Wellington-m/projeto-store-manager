const connection = require('./connection');

const getAll = async () => { 
  const [rows] = await connection.execute('SELECT * FROM StoreManager.sales;');
  return rows;
};

const create = async () => {
  const date = new Date().toISOString().replace('T', ' ').slice(0, -5);
  const [rows] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?);', [date],
  );
  return rows;
};

module.exports = { getAll, create };