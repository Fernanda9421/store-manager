const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
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
        const response = await SalesModel.getAllSales();
        expect(response).to.have.length(2);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesModel.getAllSales();
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
        const response = await SalesModel.getAllSales();
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
        const response = await SalesModel.getSaleById(FAKE_ID);
        expect(response).to.be.a('array');
        expect(response).to.have.length(2);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesModel.getSaleById(FAKE_ID);
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
        const response = await SalesModel.getSaleById(FAKE_ID);
        expect(response).to.be.a('array');
        expect(response).to.have.length(1);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesModel.getSaleById(FAKE_ID);
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
      const response = await SalesModel.getSaleById(5);
      expect(response).to.be.equal(null);
    });
  });
});

describe('isValidProductId', () => {
  describe('Dado que existem produtos no Banco de Dados', () => {
    const payload = [ 1, 2, 3 ];

    before(() => {
      const result = [payload];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('e são um total de 3 produtos', () => {
      it('retorna um array', async () => {
        const response = await SalesModel.isValidProductId();
        expect(response).to.be.an('array');
      });

      it('o array possui 3 posições', async () => {
        const response = await SalesModel.isValidProductId();
        expect(response).to.be.length(3);
      });
    });
  });
});

describe('createSale', () => {
  describe('Dado que a venda não existe no Banco de Dados', () => {
    const payloadArray = [
      {
        "productId": 1,
        "quantity": 3
      }
    ];

    const payload = {
      id: 4,
      itemsSold: [ { productId: 1, quantity: 3 } ]
    };

    before(() => {
      const result = [[payload]];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await SalesModel.createSale(payloadArray);
        expect(response).to.be.an('object');
      });

      it('o objeto possui as propriedades "id" e "itemsSold"', async () => {
        const response = await SalesModel.createSale(payloadArray);
        expect(response).to.have.keys('id', 'itemsSold');
      });
    });

  // describe('Dado que o produto já existe no Banco de Dados', () => {
  //   const payload = {
  //     name: '',
  //     quantity: 0,
  //   };

  //   before(() => {
  //     const execute = [[payload]];
  //     sinon.stub(connection, 'execute').resolves(execute);
  //   });

  //   after(() => {
  //     connection.execute.restore();
  //   });

  //   describe('quando não é inserido com sucesso', () => {
  //     it('retorna null', async () => {
  //       const response = await ProductsModel.createProduct(payload);
  //       expect(response).to.be.equal(null);
  //     });
  //   });
  });
});
