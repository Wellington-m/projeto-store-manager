const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');
const { allSales } = require('../dataMock');

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
