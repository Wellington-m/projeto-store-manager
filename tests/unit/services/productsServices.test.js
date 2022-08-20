const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');
const { allProductsResponse } = require('../dataMock');

describe('Busca todos os produtos no banco de dados', () => {
  describe('Não existe nenhum produdo cadastrado', () => {
    before(() => {
      sinon.stub(productModel, 'getAll').resolves([]);
    });
    after(() => {
      productModel.getAll.restore();
    });
    it('Retorna um array', async () => {
      const result = await productService.getAll();
      expect(result).to.be.an('array');
    });

    it('O array tem que estar vazio', async () => {
      const result = await productService.getAll();
      expect(result).to.be.empty;
    });
  });
  describe('Quando existe produtos cadastrados', () => {
    before(() => {
      const executeResult = [allProductsResponse, []];
      sinon.stub(productModel, 'getAll').resolves(executeResult);
    });
    after(() => {
      productModel.getAll.restore();
    });

    it('Retorna um array', async () => {
      const result = await productService.getAll();
      expect(result).to.be.an('array');
    });
    it('O array não esta vazio', async () => {
      const result = await productService.getAll();
      expect(result).to.be.not.empty;
    });
    it('O array possui itens do tipo objeto', async () => {
      const result = await productService.getAll();
      const product = result[0][0];
      expect(product).to.be.an('object');
    });
    it('O objeto tem as propriedades "id", "name"', async () => {
      const result = await productService.getAll();
      const product = result[0][0];
      expect(product).to.have.all.keys('id', 'name');
    });
  });
});