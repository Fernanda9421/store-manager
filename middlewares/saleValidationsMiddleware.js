const saleSchema = require('../schemas/saleSchema');

const validateProductId = (req, res, next) => {
  const { productId } = req.body[0];

  const validations = saleSchema.validateProductId(productId);
  if (validations.message) {
    return res.status(validations.code).json({ message: validations.message });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body[0];

  const validations = saleSchema.validateQuantity(quantity);
  if (validations.message) {
    return res.status(validations.code).json({ message: validations.message });
  }

  next();
};

module.exports = { validateProductId, validateQuantity };
