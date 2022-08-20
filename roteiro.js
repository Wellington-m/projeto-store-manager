const { describe } = require('mocha');

describe('Busca todos os produtos no banco de dados', () => { 
  describe('Não existe nenhum produdo cadastrado', () => { 
    it('Retorna um array');
    it('O array tem que estar vazio');
  });
  describe('Quando existe produtos cadastrados', () => {
    it('Retorna um array');
    it('O array não esta vazio');
    it('O array possui itens do tipo objeto');
    it('O objeto tem as propriedades "id", "name"');
  });
});