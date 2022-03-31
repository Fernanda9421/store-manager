const sinon = require('sinon');
const { expect } = require('chai');

const SalesController = require('../../../controllers/salesController');
const SalesService = require('../../../services/salesService');

describe('getAllSales', () => {
  describe('Dado que existem vendas no Banco de Dados', () => {
    const response = {};
    const request = {};

    before(() => {
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

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'getAllSales').resolves(payload);
    });
    after(() => {
      SalesService.getAllSales.restore();
    });

    it('retorna status 200', async () => {
      await SalesController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array com as vendas existentes', async () => {
      await SalesController.getAllSales(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Dado que não existem vendas no Banco de Dados', () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(SalesService, 'getAllSales').throwsException();
    });
    after(() => {
      SalesService.getAllSales.restore();
    });

    it('chama a função next', async () => {
      await SalesController.getAllSales(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});

describe('getProductById', () => {
  describe('Dado que o id existe no Banco de Dados', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      const payload = [{
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      }];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'getSaleById').resolves(payload);
    });
    after(() => {
      SalesService.getSaleById.restore();
    });

    it('retorna status 200', async () => {
      await SalesController.getSaleById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array com a venda', async () => {
      await SalesController.getSaleById(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Dado que o id não existe no Banco de Dados', () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(SalesService, 'getSaleById').throwsException();
    });
    after(() => {
      SalesService.getSaleById.restore();
    });

    it('chama a função next', async () => {
      await SalesController.getSaleById(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});
