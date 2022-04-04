const errors = {
  nameBlank: '"name" is required',
  nameNotString: '"name" must be a string',
  nameLength: '"name" length must be at least 5 characters long',
  quantityBlank: '"quantity" is required',
  quantityNotNumber: '"quantity" must be a number',
  quantityMin: '"quantity" must be greater than or equal to 1',
};

const codeRequired = 400;
const codeLength = 422;

const blank = (value) => (!value);
const isNotString = (value) => (typeof value !== 'string');
const isLengthLessThan = (value, min) => (value.length < min);
const isNotNumber = (value) => (typeof value !== 'number');
const isNumberValid = (value, min) => (value < min);

const validateName = (name) => {
  switch (true) {
    case blank(name):
      return { code: codeRequired, message: errors.nameBlank };
    case isNotString(name):
      return { code: codeRequired, message: errors.nameNotString };
    case isLengthLessThan(name, 5):
      return { code: codeLength, message: errors.nameLength };
    default: return {};
  }
};

const validadeQuantity = (quantity) => {
  switch (true) {
    case isNumberValid(quantity, 1):
      return { code: codeLength, message: errors.quantityMin };
    case blank(quantity):
      return { code: codeRequired, message: errors.quantityBlank };
    case isNotNumber(quantity):
      return { code: codeRequired, message: errors.quantityNotNumber };
    default: return {};
  }
};

module.exports = { validateName, validadeQuantity };
