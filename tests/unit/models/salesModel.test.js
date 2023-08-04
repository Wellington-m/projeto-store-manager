const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');
const { sale, allSales, execute } = require('../dataMock');

describe('Busca uma venda pelo ID', () => {
  describe('Quando existe a venda', () => {
    const executeResult = [[sale], []];
    before(() => {
      sinon.stub(connection, 'execute').resolves(executeResult)
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array de objetos com as propriedades correras', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([sale]);
    });
  });

  describe('Quando não existe a venda', () => {
    const executeResult = [[], []];

    before(() => {
      sinon.stub(connection, 'execute').resolves(executeResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array vazio', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });
  });
});

describe('Buscar todas as vendas', () => {
  describe('Existem vendas cadastradas', () => {
    const executeResult = [allSales, []];

    before(() => {
      sinon.stub(connection, 'execute').resolves(executeResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array com as vendas', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.deep.equal(executeResult[0]);
    });

  });

  describe('Não existem vendas cadastradas', () => {
    const executeResult = [[], []];

    before(() => {
      sinon.stub(connection, 'execute').resolves(executeResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array vazio', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });
  });
});

describe('Registra a data da venda', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('Retorna um objeto com o id do registro', async () => {
    const result = await salesModel.create();
    expect(result).to.be.an('object');
    expect(result).to.have.property('insertId', 7);
  });
});