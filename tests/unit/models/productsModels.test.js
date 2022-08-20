const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const { allProductsResponse } = require('./dataMock');

describe('Busca todos os produtos no banco de dados', () => {
  describe('Não existe nenhum produdo cadastrado', () => {
    before(() => {
      const executeResult = [[], []];
      sinon.stub(connection, 'execute').resolves(executeResult);
    });
    after(() => { 
      connection.execute.restore();
    });
    it('Retorna um array', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.an('array');
    });

    it('O array tem que estar vazio', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.empty;
    });
  });
  describe('Quando existe produtos cadastrados', () => {
    before(() => {
      const executeResult = [allProductsResponse, []];
      sinon.stub(connection, 'execute').resolves(executeResult);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.an('array');
    });
    it('O array não esta vazio', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.not.empty;
    });
    it('O array possui itens do tipo objeto', async () => {
      const result = await productModel.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('O objeto tem as propriedades "id", "name"', async () => {
      const result = await productModel.getAll();
      const product = result[0];
      expect(product).to.include.all.keys('id', 'name');
    });
  });
});