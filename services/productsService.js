const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return product;
};

const createProduct = async (product) => {
  const newProduct = await productsModel.createProduct(product);
  if (!newProduct) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Product already exists',
      },
    };
  }

  return newProduct;
};

const updateProduct = async (product) => {
  const newProduct = await productsModel.updateProduct(product);

  if (!newProduct) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return newProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
