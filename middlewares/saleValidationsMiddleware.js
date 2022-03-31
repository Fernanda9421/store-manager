const Joi = require('joi');

const saleSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const saleValidationsMiddleware = (req, res, next) => {
  const { error } = saleSchema.validate(req.body);
  if (error) throw error;

  next();
};

module.exports = saleValidationsMiddleware;
