const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');
const { allSales, sale, saleRegistered } = require('../dataMock');

describe('Buscar todas as vendas no banco de dados', () => {
  describe('Nenhuma venda registrada', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getAll').resolves([]);
    });

    after(() => {
      saleService.getAll.restore();
    });

    it('Retorna o status 200', async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Retorna um array vazio', async () => {
      await saleController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('Existem vendas registradas', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getAll').resolves(allSales);
    });

    after(() => {
      saleService.getAll.restore();
    });

    it('Retorna o status 200', async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Retorna um array com todas as vendas', async () => {
      await saleController.getAll(request, response);
      expect(response.json.calledWith(allSales)).to.be.equal(true);
    });
  });

  describe('Quando a aplicação quebra', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getAll').throws(new Error('Server Error'));
    });

    after(() => {
      saleService.getAll.restore();
    });

    it('Retorna o status 500', async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });

    it('Retorna mensagem correta de erro', async () => {
      await saleController.getAll(request, response);
      expect(response.json.calledWith({ message: 'Server error' })).to.be.equal(
        true
      );
    });
  });
});

describe('Buscar uma venda pelo ID', () => {
  describe('Não tem venda registrada', () => {
    const request = { params: { id: 1 } };
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getById').resolves([]);
    });

    after(() => {
      saleService.getById.restore();
    });

    it('Retorna o status 404', async () => {
      await saleController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('Retorna a mensagem correta', async () => {
      await saleController.getById(request, response);
      expect(response.status.calledWith({ message: 'Sale not found' }));
    });
  });

  describe('Venda encontrada com sucesso', () => {
    const request = { params: { id: 1 } };
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getById').resolves(sale);
    });

    after(() => {
      saleService.getById.restore();
    });

    it('Retorna status 200', async () => {
      await saleController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retona a venda corretamente', async () => {
      await saleController.getById(request, response);
      expect(response.json.calledWith(sale)).to.be.equal(true);
    });
  });

  describe('Quando a aplicação quebra', () => {
    const request = { params: { id: 1 } };
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getById').throws(new Error('Server Error'));
    });

    after(() => {
      saleService.getById.restore();
    });

    it('Deve retornar status 500', async () => {
      await saleController.getById(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });

    it('Retorna a mensagem correta', async () => {
      await saleController.getById(request, response);
      expect(response.json.calledWith({ message: 'Server error' })).to.be.equal(
        true
      );
    });
  });
});

describe('Cadastrar uma venda', () => {
  describe('Venda cadastrada com sucesso', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'create').resolves(saleRegistered);
    });

    after(() => {
      saleService.create.restore();
    });

    it('Retorna status 201', async () => {
      await saleController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('Retorna as informações corretas', async () => {
      await saleController.create(request, response);
      expect(response.json.calledWith(saleRegistered)).to.be.equal(true);
    });
  });
  describe('Ocorreu um erro inesperado', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'create').throws(new Error('Server error'));
    });

    after(() => {
      saleService.create.restore();
    });

    it('Retorna o status 500', async () => {
      await saleController.create(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });

    it('Retorna a mensagem correta', async () => {
      await saleController.create(request, response);
      expect(response.json.calledWith({ message: 'server error' }));
    });
  });
});
