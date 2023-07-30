const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');

describe('Buscar todas as vendas no banco de dados', () => {
  describe('Nenhuma venda registrada', () => {
    it('Retorna o status 200', async () => {});
    it('Retorna um array vazio', async () => {});
  });

  describe('Existem vendas registradas', () => {
    it('Retorna o status 200', async () => {});
    it('Retorna um array com todas as vendas', async () => {});
  });

  describe('Quando a aplicação quebra', () => {
    it('Retorna o status 500', async () => {});
    it('Retorna mensagem correta de erro', async () => {});
  });
});
