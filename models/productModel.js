const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM StoreManager.products;');
  return rows;
};

const getById = async (id) => { 
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
  );
  return rows[0];
};

module.exports = { getAll, getById };