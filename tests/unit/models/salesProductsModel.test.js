const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const salesProductsModel = require('../../../models/salesProductsModel');
const connection = require('../../../models/connection');
const { execute, saleProduct } = require('../dataMock');

describe('Registra uma venda no banco de dados', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Retorna um objeto com as propriedades corretas', async () => {
    const result = await salesProductsModel.create(1, 1, 2);
    expect(result).to.be.an('object');
    expect(result).to.have.property('affectedRows', 1);
  });
});

describe('Busca todas as associações das vendas com os produtos', () => {
  describe('Existem vendas registradas', () => {
    const executeResult = [saleProduct, []];

    before(() => {
      sinon.stub(connection, 'execute').resolves(executeResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retona as vendas corretamente', async () => {
      const result = await salesProductsModel.getAll();
      expect(result).to.be.an('array');
      expect(result[0]).to.include.all.keys('sale_id', 'product_id', 'quantity');
    });
  });

  describe('Não existem vendas registradas', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[], []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array vazio', async () => {
      const result = await salesProductsModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });
  });
});