const salesProductsModel = require('../models/salesProductsModel');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await salesProductsModel.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesProductsModel.getSaleById(id);
  if (!sale) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const createSale = async (sales) => {
  const existingIds = await productsModel.isValidProductId();
  const addIds = await sales.map((item) => item.productId);

  const includesId = addIds.every((item) => existingIds.includes(item));

  if (!includesId) {
    return {
      error: {
        code: 'notFound',
        message: 'Product id not found',
      },
    };
  }

  const newSale = await salesProductsModel.createSale(sales);

  return newSale;
};

const updateSale = async (sales, id) => {
  const existingIds = await salesModel.isValidSaleId();

  const includesId = existingIds.includes(Number(id));

  if (!includesId) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale id not found',
      },
    };
  }

  const updatedSale = await salesProductsModel.updateSale(sales, id);
  return updatedSale;
};

const deleteSale = async (id) => {
  const affectedRows = await salesModel.deleteSale(id);

  if (affectedRows === 0) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  return affectedRows;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};
