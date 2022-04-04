const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const productValidation = require('../middlewares/productValidationsMiddleware');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post(
  '/',
  productValidation.validateName,
  productValidation.validateQuantity,
  productsController.createProduct,
);
router.put(
  '/:id',
  productValidation.validateName,
  productValidation.validateQuantity,
  productsController.updateProduct,
);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
