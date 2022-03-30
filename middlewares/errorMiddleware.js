require('express-async-errors');

module.exports = (err, _req, res, _next) => {
  if (err.code) {
    const statusByErrorCode = {
      notFound: 404,
    };

    const status = statusByErrorCode[err.code] || 500;

    return res.status(status).json(err);
  }

  return res.status(500).json({ message: 'Internal server error' });
};
