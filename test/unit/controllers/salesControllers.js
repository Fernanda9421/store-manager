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

describe('createSale', () => {
  describe('Dado que o payload é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body =   [
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
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'createSale').resolves(payload);
    });

    after(() => {
      SalesService.createSale.restore();
    });

    it('retorna status 201', async () => {
      await SalesController.createSale(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um objeto com o produto', async () => {
      await SalesController.createSale(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Dado que o payload é inválido', () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(SalesService, 'createSale').throwsException();
    });
    after(() => {
      SalesService.createSale.restore();
    });

    it('chama a função next', async () => {
      await SalesController.createSale(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});

describe('updateSale', () => {
  describe('Dado que o payload é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body =   [
        {
          productId: 1,
          quantity: 2
        },
        {
          productId: 2,
          quantity: 5
        }
      ];

      request.params = { id: 1 };

      const payload = {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 2
          },
          {
            productId: 2,
            quantity: 5
          }
        ]
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'updateSale').resolves(payload);
    });

    after(() => {
      SalesService.updateSale.restore();
    });

    it('retorna status 200', async () => {
      await SalesController.updateSale(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com o produto', async () => {
      await SalesController.updateSale(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Dado que o payload é inválido', () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(SalesService, 'updateSale').throwsException();
    });
    after(() => {
      SalesService.updateSale.restore();
    });

    it('chama a função next', async () => {
      await SalesController.updateSale(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});

describe('deleteSale', () => {
  describe('Dado que o id é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 }

      const payload = 1;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.end = sinon.stub().returns();

      sinon.stub(SalesService, 'deleteSale').resolves(payload);
    });

    after(() => {
      SalesService.deleteSale.restore();
    });

    it('retorna status 204', async () => {
      await SalesController.deleteSale(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });

  describe('Dado que o id é inválido', () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response)
      response.end = sinon.stub().returns();

      sinon.stub(SalesService, 'deleteSale').throwsException();
    });
    after(() => {
      SalesService.deleteSale.restore();
    });

    it('chama a função next', async () => {
      await SalesController.deleteSale(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});
