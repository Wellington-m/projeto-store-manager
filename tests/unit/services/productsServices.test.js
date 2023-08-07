const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');
const { allProductsResponse, productById, insertAndUpdateResult } = require('../dataMock');

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
      const response = [allProductsResponse, []];
      sinon.stub(productModel, 'getAll').resolves(response);
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

describe('Buscar um produto pelo ID', () => {
  describe('Caso exista o produto buscado', () => {
    before(() => {
      sinon.stub(productModel, 'getById').resolves(productById);
    });
    after(() => {
      productModel.getById.restore();
    });
    it('Deve retornar um objeto', async () => {
      const result = await productService.getById();
      expect(result).to.be.an('object');
    });
    it('Deve conter as chaves id e name', async () => { 
      const result = await productService.getById();
      expect(result).to.have.keys('id', 'name');
    });
  });
  describe('Caso não exisa o produto buscado', () => {
    before(() => {
      sinon.stub(productModel, 'getById').resolves(undefined);
    });
    after(() => {
      productModel.getById.restore();
    });
    it('Deve retornar undefined', async () => {
      const result = await productService.getById();
      expect(result).to.be.equal(undefined);
    });
  });
});

describe('Registra um produto no banco de dados', () => {
  before(() => {
    sinon.stub(productModel, 'create').resolves(insertAndUpdateResult);
  });

  after(() => {
    productModel.create.restore();
  });

  it('Retorna as informações corretas', async () => {
    const result = await productService.create('teste');
    expect(result).to.have.property('insertId');
  });
});

describe('Atualiza um produto no banco de dados', () => {});