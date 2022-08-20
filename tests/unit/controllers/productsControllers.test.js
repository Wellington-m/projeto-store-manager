const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const { allProductsResponse } = require('../dataMock');

describe('Busca todos os produtos no banco de dados', () => {
  describe('Não existe nenhum produdo cadastrado', () => {
    const request = {};
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves([]);
    });
    after(() => {
      productService.getAll.restore();
    });

    it('Retorna o status 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('O array tem que estar vazio', async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
  describe('Quando existe produtos cadastrados', () => {
    const request = {};
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves(allProductsResponse);
    });
    after(() => {
      productService.getAll.restore();
    });
    it('Retorna o status 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('O array não esta vazio', async () => {
      await productController.getAll(request, response);
      expect(response.json.args[0][0]).to.be.not.empty;
    });
  });
});