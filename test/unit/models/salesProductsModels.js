const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesProductModel = require('../../../models/salesProductsModel');
const SalesModel = require('../../../models/salesModel');

describe('getAllSales', () => {
  describe('Lista todas as vendas do Banco de Dados', () => {
    const execute = [[
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]];
    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é retornado com sucesso', () => {
      it('retorna um array com 2 posições', async () => {
        const response = await SalesProductModel.getAllSales();
        expect(response).to.have.length(2);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesProductModel.getAllSales();
        expect(response[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('Não lista nenhuma venda do Banco de Dados', () => {
    const execute = [[]];
    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é retornado com sucesso', () => {
      it('retorna null', async () => {
        const response = await SalesProductModel.getAllSales();
        expect(response).to.be.equal(null);
      });
    });
  });
});

describe('getSaleById', () => {
  describe('Dado que a venda existe no Banco de Dados', () => {
    const FAKE_ID = 1;
    const payload = [[
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]];
    before(() => {
      sinon.stub(connection, 'execute').resolves(payload);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando existem 2 vendas com o mesmo id', () => {
      it('retorna um array com 2 posições', async () => {
        const response = await SalesProductModel.getSaleById(FAKE_ID);
        expect(response).to.be.a('array');
        expect(response).to.have.length(2);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesProductModel.getSaleById(FAKE_ID);
        expect(response[0]).to.have.keys('date', 'productId', 'quantity');
      });
    });
  });

  describe('Dado que a venda existe no Banco de Dados', () => {
    const FAKE_ID = 2;
    const payload = {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    };
    before(() => {
      const result = [[payload]]
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando existe 1 venda com o id', () => {
      it('retorna um array com 1 posição', async () => {
        const response = await SalesProductModel.getSaleById(FAKE_ID);
        expect(response).to.be.a('array');
        expect(response).to.have.length(1);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesProductModel.getSaleById(FAKE_ID);
        expect(response[0]).to.have.keys('date', 'productId', 'quantity');
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
      const response = await SalesProductModel.getSaleById(5);
      expect(response).to.be.equal(null);
    });
  });
});

describe('createSale', () => {
  describe('Dado que a venda não existe no Banco de Dados', () => {
    const parameter =   [
      {
        productId: 1,
        quantity: 3
      }
    ];

    const payload = {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 3
        }
      ]
    }

    before(() => {
      const execute = [[payload]];
      sinon.stub(connection, 'execute').resolves(execute);
      sinon.stub(SalesModel, 'insertSale').resolves(1);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await SalesProductModel.createSale(parameter);
        expect(response).to.be.an('object');
      });
    });
  });
});

describe('updateSale', () => {
  describe('Dado que a venda existe no Banco de Dados', () => {
    const parameter = [
      {
        productId: 1,
        quantity: 6
      }
    ];

    const payload = {
      saleId: 1,
      itemUpdated: [
        {
          productId: 1,
          quantity: 6
        }
      ]
    };

    before(() => {
      const result = [[payload]];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é atualizado com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await SalesProductModel.updateSale(parameter);
        expect(response).to.be.an('object');
      });

      it('o objeto possui as propriedades "saleId" e "itemUpdated"', async () => {
        const response = await SalesProductModel.updateSale(parameter);
        expect(response).to.have.keys('saleId', 'itemUpdated');
      });
    });
  });
});
