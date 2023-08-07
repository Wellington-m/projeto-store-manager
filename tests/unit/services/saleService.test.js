const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../services/saleService');
const salesModel = require('../../../models/salesModel');
const salesProductsModel = require('../../../models/salesProductsModel');
const { allSales, sale } = require('../dataMock');

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
    before(() => {
      sinon.stub(salesModel, 'getById').resolves([]);
    });

    after(() => { salesModel.getById.restore() });

    it('Retorna um array vazio', async () => {
      const result = await saleService.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });
  });

  describe('Existe vendas cadastradas', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves([sale]);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('Retorna a venda corretamente', async () => {
      const result = await saleService.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([sale]);
    });
  });
});

describe('Registra uma venda', () => {
  before(() => {
    sinon.stub(salesModel, 'create').resolves({ insertId: 10 });
    sinon.stub(salesProductsModel, 'create').resolves();
  });

  after(() => {
    salesModel.create.restore();
    salesProductsModel.create.restore();
  });

  it('Retorna as informações corretamente', async () => {
    const products = [
      {
        productId: 1,
        quantity:1
      },
      {
        productId: 3,
        quantity:3
      }
    ];
    const result = await saleService.create(products);
    expect(result).to.be.an('object');
    expect(result).to.include.all.keys('id', 'itemsSold');
  });
});