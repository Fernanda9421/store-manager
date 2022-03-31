const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/productsService');
const ProductsModel = require('../../../models/productsModel');

describe('getAllProducts', () => {
  describe('Dado que existem produtos no Banco de Dados', () => {
    const payload = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ];
    before(() => {
      sinon.stub(ProductsModel, 'getAllProducts').resolves(payload);
    });
    after(() => {
      ProductsModel.getAllProducts.restore();
    });

    describe('quando é retornado com sucesso', () => {
      it('retorna um array com 3 posições', async () => {
        const response = await ProductsService.getAllProducts();
        expect(response).to.have.length(3);
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await ProductsService.getAllProducts();
        expect(response[0]).to.have.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('Dado que não há produtos no Banco de Dados', () => {
    const payload = null;
    before(() => {
      sinon.stub(ProductsModel, 'getAllProducts').resolves(payload);
    });
    after(() => {
      ProductsModel.getAllProducts.restore();
    });

    describe('quando é retornado com sucesso', () => {
      it('retorna null', async () => {
        const response = await ProductsService.getAllProducts();
        expect(response).to.be.equal(null);
      });
    });
  });
});

describe('getProductById', () => {
  describe('Dado que o produto existe no Banco de dados', () => {
    const FAKE_ID = 1;
    const payload = { id: 1, name: 'Martelo de Thor', quantity: 10 };

    before(() => {
      sinon.stub(ProductsModel, 'getProductById').resolves(payload);
    });
    after(() => {
      ProductsModel.getProductById.restore();
    });

    describe('quando o id existe', () => {
      it('retorna um objeto', async () => {
        const response = await ProductsService.getProductById(FAKE_ID);
        expect(response).to.be.a('object');
      });

      it('o objeto contém as propriedades corretas', async () => {
        const response = await ProductsService.getProductById(FAKE_ID);
        expect(response).to.have.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('quando o id não existe', () => {
    const result = null;
    before(() => {
      sinon.stub(ProductsModel, 'getProductById').resolves(result);
    });
    after(() => {
      ProductsModel.getProductById.restore();
    });

    it('retorna notFound', async () => {
      const response = await ProductsService.getProductById(9);
      expect(response.error.code).to.be.equal('notFound');
    });

    it('retorna mensagem de erro correta', async () => {
      const response = await ProductsService.getProductById(9);
      expect(response.error.message).to.be.equal('Product not found');
    });
  });
});
