const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const saleValidation = require('../middlewares/saleValidationsMiddleware');

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post(
  '/',
  saleValidation.validateProductId,
  saleValidation.validateQuantity,
  salesController.createSale,
);
router.put(
  '/:id',
  saleValidation.validateProductId,
  saleValidation.validateQuantity,
  // salesController.updateSale,
);

module.exports = router;
