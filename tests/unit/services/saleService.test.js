const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../services/saleService');
const salesModel = require('../../../models/salesModel');
const salesProductsModel = require('../../../models/salesProductsModel');

describe('Lista todas as vendas', () => {
  describe('Não existe vendas cadastradas', () => {

    it('Retorna um array vazio', () => {});
  });

  describe('Existe vendas cadastradas', () => {

    it('Retorna as vendas corretamente', () => {});
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