const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const { allProductsResponse, productById } = require('../dataMock');

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
  describe('Quando a aplicação quebra', () => {
    const request = {};
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').throws(new Error('Server error'));
    });
    after(() => {
      productService.getAll.restore();
    });
    it('Retorna status 500', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it('Retorna a mensagem: Server error', async () => { 
      await productController.getAll(request, response);
      expect(response.json.args[0]).to.deep.include({ message: 'Server error' });
    });
  });
});

describe('Buscar um produto pelo ID', () => { 
  describe('Caso exista o produto buscado', () => {
    const request = { params: { id: '1' } };
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves(productById);
    });
    after(() => {
      productService.getById.restore();
    });
    it('Deve retornar o status 200', async () => {
      await productController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Caso não exisa o produto buscado', () => { 
    const request = { params: { id: '1000' } };
    const response = {};
    before(() => { 
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves();
    });
    after(() => { 
      productService.getById.restore();
    });
    it('Deve retornar o status 404', async () => {
      await productController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('Deve retornar a mensagem: Product not found', async () => { 
      await productController.getById(request, response);
      expect(response.json.args[0]).to.deep.include({ message: 'Product not found' });
    });
  });
  describe('Quando a aplicação quebra', () => {
    const request = { params: { id: '1' } };
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').throws(new Error('Server error'));
    });
    after(() => {
      productService.getById.restore();
    });
    it('Retorna status 500', async () => {
      await productController.getById(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it('Retorna a mensagem: Server error', async () => {
      await productController.getById(request, response);
      expect(response.json.args[0]).to.deep.include({ message: 'Server error' });
    });
  });
});