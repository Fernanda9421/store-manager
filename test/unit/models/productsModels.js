const sinon = require('sinon');
const { exect, expect } = require('chai');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');

describe('getAllProducts', () => {
  describe('Lista todos os produtos do Banco de Dados', () => {
    const execute = [[
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ]];
    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é retornado com sucesso', () => {
      it('retorna um array com 3 posições', async () => {
        const response = await ProductsModel.getAllProducts();
        expect(response).to.have.length(3);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await ProductsModel.getAllProducts();
        expect(response[0]).to.have.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('Não lista nenhum produto do Banco de Dados', () => {
    const execute = [[]];
    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é retornado com sucesso', () => {
      it('retorna null', async () => {
        const response = await ProductsModel.getAllProducts();
        expect(response).to.be.equal(null);
      });
    });
  });
});

describe('getProductById', () => {
  describe('Dado que o produto existe no Banco de dados', () => {
    const FAKE_ID = 1;
    const payload = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };
    before(() => {
      const result = [[payload]];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando o id existe', () => {
      it('retorna um objeto', async () => {
        const response = await ProductsModel.getProductById(FAKE_ID);
        expect(response).to.be.a('object');
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await ProductsModel.getProductById(FAKE_ID);
        expect(response).to.have.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('quando o id não existe', () => {
    const result = [[]];
    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await ProductsModel.getProductById(99);
      expect(response).to.be.equal(null);
    });
  });
});
