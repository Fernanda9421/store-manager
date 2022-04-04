const productSchema = require('../schemas/productSchema');

const validateName = (req, res, next) => {
  const { name } = req.body;
  const validations = productSchema.validateName(name);

  if (validations.message) {
    return res.status(validations.code).json({ message: validations.message });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validations = productSchema.validadeQuantity(quantity);

  if (validations.message) {
    return res.status(validations.code).json({ message: validations.message });
  }

  next();
};

module.exports = { validateName, validateQuantity };
