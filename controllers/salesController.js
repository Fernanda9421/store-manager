const salesService = require('../services/salesService');

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await salesService.getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);

    if (sale.error) return next(sale.error);

    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const createSale = async (req, res, next) => {
  try {
    const sale = await salesService.createSale([...req.body]);

    if (sale.error) return next(sale.error);

    return res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSale = req.body;

    const newSale = await salesService.updateSale([...updatedSale], id);

    return res.status(200).json(newSale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
};
