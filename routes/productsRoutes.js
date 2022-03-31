const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const productValidation = require('../middlewares/productValidationsMiddleware');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productValidation, productsController.createProduct);

module.exports = router;
