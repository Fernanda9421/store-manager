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

const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = await productsService.createProduct(product);

    if (newProduct.error) return next(newProduct.error);
    product.id = newProduct.insertId;
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    const newProduct = await productsService.updateProduct({ id, ...updatedProduct });
    if (newProduct.error) return next(newProduct.error);

    return res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productsService.deleteProduct(id);
    if (deletedProduct.error) return next(deletedProduct.error);

    return res.status(204).json().end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
