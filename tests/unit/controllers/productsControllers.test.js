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
      expect(response.json.args[0]).to.deep.include({
        message: 'Server error',
      });
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

    it('Deve retornar o produto', async () => {
      await productController.getById(request, response);
      expect(response.json.calledWith(productById)).to.be.equal(true);
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
      expect(response.json.args[0]).to.deep.include({
        message: 'Product not found',
      });
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
      expect(response.json.args[0]).to.deep.include({
        message: 'Server error',
      });
    });
  });
});

describe('Cadastrar um produto', () => {
  describe('Produto é cadastrado com sucesso', () => {
    const request = { body: { name: 'teste' } };
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(productService, 'create')
        .resolves({ insertId: 1, name: 'teste' });
    });

    after(() => {
      productService.create.restore();
    });

    it('Deve retornar o status 201', async () => {
      await productController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('Deve retornar o id do produto e o nome', async () => {
      await productController.create(request, response);
      expect(response.json.args[0]).to.deep.include({ id: 1, name: 'teste' });
    });
  });
  describe('Caso ocorra um erro na aplicação', () => {
    const request = { body: { name: 'teste' } };
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'create').throws(new Error('Server error'));
    });

    after(() => {
      productService.create.restore();
    });

    it('Deve retornar status 500', async () => {
      await productController.create(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it('Deve retornar a mensagem SERVER ERROR', async () => {
      await productController.create(request, response);
      expect(response.json.args[0]).to.deep.include({
        message: 'Server error',
      });
    });
  });
});

describe('Atualizar o nome de um produto', () => {
  describe('Nome é atualizado com sucesso', () => {
    const request = { body: { name: 'Atualizado' }, params: { id: '1' } };
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(productService, 'update')
        .resolves({ id: '1', name: 'Atualizado' });
    });

    after(() => {
      productService.update.restore();
    });

    it('Deve retornar o status 200', async () => {
      await productController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Deve retornar o id do produto e o nome', async () => {
      await productController.update(request, response);
      expect(response.json.args[0]).to.deep.include({
        id: '1',
        name: 'Atualizado',
      });
    });
  });
  describe('Caso o produto não seja encontrado', () => {
    const request = { body: { name: 'Atualizado' }, params: { id: '10000' } };
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'update').returns(false);
    });

    after(() => {
      productService.update.restore();
    });

    it('Deve retornar status 404', async () => {
      await productController.update(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('Deve retornar a mensagem: Product not found', async () => {
      await productController.update(request, response);
      expect(response.json.args[0]).to.deep.include({
        message: 'Product not found',
      });
    });
  });
});
