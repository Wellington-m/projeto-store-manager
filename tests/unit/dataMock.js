const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const productById = { id: 1, name: 'Martelo de Thor' };

const allSales = [
  {
    saleId: 1,
    date: '2023-07-30T21:33:51.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-07-30T21:33:51.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-07-30T21:33:51.000Z',
    productId: 3,
    quantity: 15,
  },
];

const sale = {
  date: '2023-07-30T21:33:51.000Z',
  productId: 3,
  quantity: 15,
};

const saleRegistered = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 3,
      quantity: 3,
    },
  ],
};

const execute = [  
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 7,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const saleProduct = [
  {
    sale_id: 1,
    product_id: 1,
    quantity: 1
  },
  {
    sale_id: 1,
    product_id: 3,
    quantity: 3
  }
];

const insertResult = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 7,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const updateResult = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
};

module.exports = {
  allProductsResponse,
  productById,
  allSales,
  sale,
  saleRegistered,
  execute,
  saleProduct,
  insertResult,
  updateResult,
};
