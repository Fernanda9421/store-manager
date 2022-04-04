const errors = {
  notProductId: '"productId" is required',
  notQuantity: '"quantity" is required',
  quantityMin: '"quantity" must be greater than or equal to 1',
};

const blank = (value) => (!value);
const isNumberValid = (value, min) => (value < min);

const validateProductId = (productId) => {
  const code = 400;

  switch (true) {
    case blank(productId):
      return { code, message: errors.notProductId };

    default:
      return {};
  }
};

const validateQuantity = (quantity) => {
  const codeRequired = 400;
  const codeLength = 422;

  switch (true) {
    case isNumberValid(quantity, 1):
      return { code: codeLength, message: errors.quantityMin };
    case blank(quantity):
      return { code: codeRequired, message: errors.notQuantity };

    default: return {};
  }
};

module.exports = { validateProductId, validateQuantity };
