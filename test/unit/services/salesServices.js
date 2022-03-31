const sinon = require('sinon');
const { expect } = require('chai');

const SalesService = require('../../../services/salesService');
const SalesModel = require('../../../models/salesModel');

describe('getAllSales', () => {
  describe('Dado que existem vendas no Banco de Dados', () => {
    const payload = [
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
    ];
    before(() => {
      sinon.stub(SalesModel, 'getAllSales').resolves(payload);
    });
    after(() => {
      SalesModel.getAllSales.restore();
    });

    describe('quando é retornado com sucesso', () => {
      it('retorna um array com 2 posições', async () => {
        const response = await SalesService.getAllSales();
        expect(response).to.have.length(2);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesService.getAllSales();
        expect(response[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('Dado que não há vendas no Banco de Dados', () => {
    const payload = null;
    before(() => {
      sinon.stub(SalesModel, 'getAllSales').resolves(payload);
    });
    after(() => {
      SalesModel.getAllSales.restore();
    });

    describe('quando é retornado com sucesso', () => {
      it('retorna null', async () => {
        const response = await SalesService.getAllSales();
        expect(response).to.be.equal(null);
      });
    });
  });
});

describe('getSaleById', () => {
  describe('Dado que a venda existe no Banco de dados', () => {
    const FAKE_ID = 1;
    const payload = [{
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2
    }];

    before(() => {
      sinon.stub(SalesModel, 'getSaleById').resolves(payload);
    });
    after(() => {
      SalesModel.getSaleById.restore();
    });

    describe('quando o id existe', () => {
      it('retorna um array', async () => {
        const response = await SalesService.getSaleById(FAKE_ID);
        expect(response).to.be.a('array');
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesService.getSaleById(FAKE_ID);
        expect(response[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('quando o id não existe', () => {
    const result = null;
    before(() => {
      sinon.stub(SalesModel, 'getSaleById').resolves(result);
    });
    after(() => {
      SalesModel.getSaleById.restore();
    });

    it('retorna notFound', async () => {
      const response = await SalesService.getSaleById(10);
      expect(response.error.code).to.be.equal('notFound');
    });

    it('retorna mensagem de erro correta', async () => {
      const response = await SalesService.getSaleById(10);
      expect(response.error.message).to.be.equal('Sale not found');
    });
  });
});
