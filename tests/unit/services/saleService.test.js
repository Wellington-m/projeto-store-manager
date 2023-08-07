const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../services/saleService');
const salesModel = require('../../../models/salesModel');
const salesProductsModel = require('../../../models/salesProductsModel');
const { allSales } = require('../dataMock');

describe('Lista todas as vendas', () => {
  describe('Não existe vendas cadastradas', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([]);
    });
    
    after(() => { salesModel.getAll.restore() });

    it('Retorna um array vazio', async () => {
      const result = await saleService.getAll();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });
  });

  describe('Existe vendas cadastradas', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(allSales)
    });

    after(() => { salesModel.getAll.restore() });

    it('Retorna as vendas corretamente', async () => {
      const result = await saleService.getAll();
      expect(result).to.deep.equal(allSales);
    });
  });
});

describe('Busca uma venda pelo ID', () => {
  describe('Não existe vendas cadastradas', () => {

    it('Retorna um array vazio', () => {});
  });

  describe('Existe vendas cadastradas', () => {

    it('Retorna a venda corretamente', () => {});
  });
});

describe('Registra uma venda', () => {
  it('Retorna as informações corretamente', () => {});
});