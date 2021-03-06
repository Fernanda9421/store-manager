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
    const next = sinon.spy();

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsService, 'getAllProducts').throwsException();
    });
    after(() => {
      ProductsService.getAllProducts.restore();
    });

    it('chama a função next', async () => {
      await ProductsController.getAllProducts(request, response, next);
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

  describe('Dado que o id não existe no Banco de Dados', () => {
    const response = {};
    const request = {};
    const next = sinon.spy();

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsService, 'getProductById').throwsException();
    });
    after(() => {
      ProductsService.getProductById.restore();
    });

    it('chama a função next', async () => {
      await ProductsController.getProductById(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});

describe('createProduct', () => {
  describe('Dado que o payload é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: "Porta de metal",
        quantity: 3
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'createProduct').resolves(true);
    });

    after(() => {
      ProductsService.createProduct.restore();
    });

    it('retorna status 201', async () => {
      await ProductsController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um objeto com o produto', async () => {
      await ProductsController.createProduct(request, response);

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

      sinon.stub(ProductsService, 'createProduct').throwsException();
    });
    after(() => {
      ProductsService.createProduct.restore();
    });

    it('chama a função next', async () => {
      await ProductsController.createProduct(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});

describe('updateProduct', () => {
  describe('Dado que o payload é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: "Janela preta",
        quantity: 8
      };

      request.params = { id: 4 };

      const payload = {
        id: 4,
        name: "Janela preta",
        quantity: 8
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'updateProduct').resolves(payload);
    });

    after(() => {
      ProductsService.updateProduct.restore();
    });

    it('retorna status 200', async () => {
      await ProductsController.updateProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um objeto com o produto', async () => {
      await ProductsController.updateProduct(request, response);
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

      sinon.stub(ProductsService, 'updateProduct').throwsException();
    });
    after(() => {
      ProductsService.updateProduct.restore();
    });

    it('chama a função next', async () => {
      await ProductsController.updateProduct(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});

describe('deleteProduct', () => {
  describe('Dado que o id é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 }

      const payload = 1;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.end = sinon.stub().returns();

      sinon.stub(ProductsService, 'deleteProduct').resolves(payload);
    });

    after(() => {
      ProductsService.deleteProduct.restore();
    });

    it('retorna status 204', async () => {
      await ProductsController.deleteProduct(request, response);

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

      sinon.stub(ProductsService, 'deleteProduct').throwsException();
    });
    after(() => {
      ProductsService.deleteProduct.restore();
    });

    it('chama a função next', async () => {
      await ProductsController.deleteProduct(request, response, next);
      expect(next.calledOnce).to.be.equal(true);
    });
  });
});
