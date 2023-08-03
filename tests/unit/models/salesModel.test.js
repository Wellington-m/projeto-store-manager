const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');
const { sale } = require('../dataMock');

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