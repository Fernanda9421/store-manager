const Joi = require('joi');
require('express-async-errors');

module.exports = (err, _req, res, _next) => {
  if (Joi.isError(err)) {
    return res.status(422).json({ message: err.message });
  }

  if (err.code) {
    const statusByErrorCode = {
      notFound: 404,
      alreadyExists: 409,
    };

    const status = statusByErrorCode[err.code] || 500;

    return res.status(status).json(err);
  }

  return res.status(500).json({ message: 'Internal server error' });
};
