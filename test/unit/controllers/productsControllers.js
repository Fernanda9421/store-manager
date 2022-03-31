const sinon = require('sinon');
const { expect } = require('chai');

const ProductsController = require('../../../controllers/productsController');
const ProductsService = require('../../../services/productsService');

describe('getAllProducts', () => {
  describe('Dado que existem produtos no Banco de Dados', () => {
    const response = {};
    const request = {};

    before(() => {
      const payload = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'getAllProducts').resolves(payload);
    });
    after(() => {
      ProductsService.getAllProducts.restore();
    });

    it('retorna status 200', async () => {
      await ProductsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array com os produtos existentes', async () => {
      await ProductsController.getAllProducts(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Dado que não existem produtos no Banco de Dados', () => {
    const response = {};
    const request = {};
    // const next = {};

    before(() => {
      const payload = { error: {
        code: 'notFound',
        message: 'Product not found',
      } };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      // next = sinon.stub().returns();

      sinon.stub(ProductsService, 'getAllProducts').resolves(payload);
    });
    after(() => {
      ProductsService.getAllProducts.restore();
    });

    // it('chama um erro', async () => {
    //   await ProductsController.getAllProducts(request, response, next);
    //   expect(next.calledOnce).to.be.true;
    // });
  });
});

describe('getProductById', () => {
  describe('Dado que o id existe no Banco de Dados', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      const payload = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'getProductById').resolves(payload);
    });
    after(() => {
      ProductsService.getProductById.restore();
    });

    it('retorna status 200', async () => {
      await ProductsController.getProductById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com o produto', async () => {
      await ProductsController.getProductById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
