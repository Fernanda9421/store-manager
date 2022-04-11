const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');

describe('insertSale', () => {
  describe('Dado que a venda não existe no Banco de Dados', () => {
    before(() => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', () => {
      it('retorna um número', async () => {
        const response = await SalesModel.insertSale();
        expect(response).to.be.a('number').to.be.equal(1);
      });
    });
  });
});

describe('isValidSaleId', () => {
  describe('Dado que existem vendas no Banco de Dados', () => {
    const payload = [1, 2];

    before(() => {
      const result = [payload];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });

    describe('e são um total de 2 vendas', () => {
      it('retorna um array', async () => {
        const response = await SalesModel.isValidSaleId();
        expect(response).to.be.an('array');
      });

      it('o array possui 2 posições', async () => {
        const response = await SalesModel.isValidSaleId();
        expect(response).to.be.length(2);
      });
    });
  });
});

describe('deleteSale', () => {
  describe('Dado que a venda existe no Banco de Dados', () => {
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
        const response = await SalesModel.deleteSale(payload);
        expect(response).to.be.an('number').to.equal(1);
      });
    });
  });

  describe('Dado que a venda não existe no Banco de Dados', () => {
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
        const response = await SalesModel.deleteSale(payload);
        expect(response).to.be.an('number').to.equals(0);
      });
    });
  });
});
