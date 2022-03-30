const productsService = require('../services/productsService');

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);

    if (product.error) return next(product.error);

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
