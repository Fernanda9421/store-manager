const sinon = require('sinon');
const { expect } = require('chai');

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
      id: 1,
      name: "produto A",
      quantity: 10
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

describe('countRepeatedNames', () => {
  describe('Dado que o nome foi passado por parâmetro', () => {
    const FAKE_NAME = 'Produto';
    const payload = { count: 0 };

    before(() => {
      const result = [payload];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('e já existe na tabela', () => {
      it('retorna um array', async () => {
        const response = await ProductsModel.countRepeatedNames(FAKE_NAME);
        expect(response).to.be.an('array');
      });

      it('o objeto retorna valor igual 0', async () => {
        const response = await ProductsModel.countRepeatedNames(FAKE_NAME);
        expect(response[0]).to.own.include({ count: 0 });
      });
    });
  });

  describe('Dado que o nome foi passado por parâmetro', () => {
    const FAKE_NAME = 'Produto';
    const payload = { count: 1 };

    before(() => {
      const result = [payload];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando o nome não existe na tabela', () => {
      it('retorna um array', async () => {
        const response = await ProductsModel.countRepeatedNames(FAKE_NAME);
        expect(response).to.be.an('array');
      });

      it('o objeto retorna valor igual 1', async () => {
        const response = await ProductsModel.countRepeatedNames(FAKE_NAME);
        expect(response[0]).to.own.include({ count: 1 });
      });
    });
  });
});

describe('createProduct', () => {
  describe('Dado que o produto não existe no Banco de Dados', () => {
    const payload = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 9,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    };

    before(() => {
      const result = [[payload]];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', () => {
      it('retorna um array', async () => {
        const response = await ProductsModel.createProduct(payload);
        expect(response).to.be.an('array');
      });

      it('o objeto possui a propriedade insertId', async () => {
        const response = await ProductsModel.createProduct(payload);

        expect(response[0]).to.have.a.property('insertId');
      });
    });
  });

  describe('Dado que o produto já existe no Banco de Dados', () => {
    const payload = {
      name: '',
      quantity: 0,
    };

    before(() => {
      const execute = [[payload]];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    describe('quando não é inserido com sucesso', () => {
      it('retorna null', async () => {
        const response = await ProductsModel.createProduct(payload);
        expect(response).to.be.equal(null);
      });
    });
  });
});

describe('updateProduct', () => {
  describe('Dado que o produto existe no Banco de Dados', () => {
    const payload = {
      id: 4,
      name: "Janela preta",
      quantity: 8
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
        const response = await ProductsModel.updateProduct(payload);
        expect(response).to.be.an('object');
      });
    });
  });

  describe('Dado que o produto não existe no Banco de Dados', () => {
    const payload = {
      id: 25,
      name: "",
      quantity: 0
    };

    before(() => {
      const result = [{ affectedRows: 0 }];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando não é atualizado com sucesso', () => {
      it('retorna null', async () => {
        const response = await ProductsModel.updateProduct(payload);
        expect(response).to.be.equal(null);
      });
    });
  });
});

describe('deleteProduct', () => {
  describe('Dado que o produto existe no Banco de Dados', () => {
    const payload = { affectedRows: 1 };

    before(() => {
      const result = [payload];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é excluído com sucesso', () => {
      it('retorna o número 1', async () => {
        const response = await ProductsModel.deleteProduct(payload);
        expect(response).to.be.an('number').to.equal(1);
      });
    });
  });

  describe('Dado que o produto não existe no Banco de Dados', () => {
    const payload = { affectedRows: 0 };

    before(() => {
      const result = [payload];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando não é excluído com sucesso', () => {
      it('retorna o número 0', async () => {
        const response = await ProductsModel.deleteProduct(payload);
        expect(response).to.be.an('number').to.equals(0);
      });
    });
  });
});

describe('isValidProductId', () => {
  describe('Dado que existem produtos no Banco de Dados', () => {
    const payload = [1, 2, 3];

    before(() => {
      const result = [payload];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('e são um total de 3 produtos', () => {
      it('retorna um array', async () => {
        const response = await ProductsModel.isValidProductId();
        expect(response).to.be.an('array');
      });

      it('o array possui 3 posições', async () => {
        const response = await ProductsModel.isValidProductId();
        expect(response).to.be.length(3);
      });
    });
  });
});
