const sinon = require('sinon');
const { expect } = require('chai');

const SalesService = require('../../../services/salesService');
const SalesProductsModel = require('../../../models/salesProductsModel');
const ProductModel = require('../../../models/productsModel');
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
      sinon.stub(SalesProductsModel, 'getAllSales').resolves(payload);
    });
    after(() => {
      SalesProductsModel.getAllSales.restore();
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
      sinon.stub(SalesProductsModel, 'getAllSales').resolves(payload);
    });
    after(() => {
      SalesProductsModel.getAllSales.restore();
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
    const payload = [
      {
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ];

    before(() => {
      sinon.stub(SalesProductsModel, 'getSaleById').resolves(payload);
    });
    after(() => {
      SalesProductsModel.getSaleById.restore();
    });

    describe('quando o id existe', () => {
      it('retorna um array de 2 posições', async () => {
        const response = await SalesService.getSaleById(FAKE_ID);
        expect(response).to.be.a('array').to.be.length(2);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await SalesService.getSaleById(FAKE_ID);
        expect(response[0]).to.have.keys('date', 'productId', 'quantity');
      });
    });
  });

  describe('quando o id não existe', () => {
    const result = null;
    before(() => {
      sinon.stub(SalesProductsModel, 'getSaleById').resolves(result);
    });
    after(() => {
      SalesProductsModel.getSaleById.restore();
    });

    it('retorna notFound', async () => {
      const response = await SalesService.getSaleById(9);
      expect(response.error.code).to.be.equal('notFound');
    });

    it('retorna mensagem de erro correta', async () => {
      const response = await SalesService.getSaleById(9);
      expect(response.error.message).to.be.equal('Sale not found');
    });
  });
});

describe('createSale', () => {
  describe('Dado que o produtId existe no Banco de Dados', () => {
    const FAKE_SALE = [
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

    before(() => {
      sinon.stub(SalesProductsModel, 'createSale').resolves(payload);
      sinon.stub(ProductModel, 'isValidProductId').resolves([1, 2, 3]);
    });
    after(() => {
      SalesProductsModel.createSale.restore();
      ProductModel.isValidProductId.restore();
    });

    describe('quando é inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await SalesService.createSale(FAKE_SALE);
        expect(response).to.be.an('object');
      });
    });
  });

  describe('Dado que o productId não existe no Banco de Dados', () => {
    const FAKE_SALE = [
      {
        productId: 12,
        quantity: 3
      }
    ];

    before(() => {
      const execute = null;
      sinon.stub(SalesProductsModel, 'createSale').resolves(execute);
      sinon.stub(ProductModel, 'isValidProductId').resolves([1, 2, 3]);
    });

    after(() => {
      SalesProductsModel.createSale.restore();
      ProductModel.isValidProductId.restore();
    });

    describe('quando não é inserido com sucesso', () => {
      it('retorna notFound', async () => {
        const response = await SalesService.createSale(FAKE_SALE);
        expect(response.error.code).to.be.equal('notFound');
      });

      it('retorna mensagem de erro correta', async () => {
        const response = await SalesService.createSale(FAKE_SALE);
        expect(response.error.message).to.be.equal('Product id not found');
      });
    });
  });
});

describe('updateSale', () => {
  describe('Dado que a venda existe no Banco de Dados', () => {
    const FAKE_SALE = [
      {
        productId: 1,
        quantity: 6
      }
    ];

    const FAKE_ID = 8;

    const payload = {
      saleId: 8,
      itemUpdated: [
        {
          productId: 1,
          quantity: 6
        }
      ]
    };

    before(() => {
      sinon.stub(SalesProductsModel, 'updateSale').resolves(payload);
      sinon.stub(SalesModel, 'isValidSaleId').resolves([1, 2, 3, 4, 8]);
    });
    after(() => {
      SalesProductsModel.updateSale.restore();
      SalesModel.isValidSaleId.restore();
    });

    describe('quando é atualizado com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await SalesService.updateSale(FAKE_SALE, FAKE_ID);
        expect(response).to.be.an('object');
      });
    });
  });

  describe('Dado que a venda não existe no Banco de Dados', () => {
    const FAKE_SALE = [
      {
        productId: 1,
        quantity: 6
      }
    ];

    const FAKE_ID = 85;

    before(() => {
      const execute = null;
      sinon.stub(SalesProductsModel, 'updateSale').resolves(execute);
      sinon.stub(SalesModel, 'isValidSaleId').resolves([1, 2, 3, 4, 8]);
    });

    after(() => {
      SalesProductsModel.updateSale.restore();
      SalesModel.isValidSaleId.restore();
    });

    describe('quando não é atualizado com sucesso', () => {
      it('retorna notFound', async () => {
        const response = await SalesService.updateSale(FAKE_SALE, FAKE_ID);
        expect(response.error.code).to.be.equal('notFound');
      });

      it('retorna mensagem de erro correta', async () => {
        const response = await SalesService.updateSale(FAKE_SALE, FAKE_ID);
        expect(response.error.message).to.be.equal('Sale id not found');
      });
    });
  });
});

describe('deleteSale', () => {
  describe('Dado que a venda existe no Banco de Dados', () => {
    const payload = 1;

    before(() => {
      sinon.stub(SalesModel, 'deleteSale').resolves(payload);
    });
    after(() => {
      SalesModel.deleteSale.restore();
    });

    describe('quando é deletado com sucesso', () => {
      it('retorna o número 1', async () => {
        const response = await SalesService.deleteSale(payload);
        expect(response).to.be.a('number').to.equal(1);
      });
    });
  });

  describe('Dado que a venda não existe no Banco de Dados', () => {
    const payload = 0;

    before(() => {
      sinon.stub(SalesModel, 'deleteSale').resolves(payload);
    });

    after(() => {
      SalesModel.deleteSale.restore();
    });

    describe('quando não é deletado com sucesso', () => {
      it('retorna notFound', async () => {
        const response = await SalesService.deleteSale(payload);
        expect(response.error.code).to.be.equal('notFound');
      });

      it('retorna mensagem de erro correta', async () => {
        const response = await SalesService.deleteSale(payload);
        expect(response.error.message).to.be.equal('Sale not found');
      });
    });
  });
});
