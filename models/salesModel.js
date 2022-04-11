const connection = require('./connection');

const insertSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (`date`) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(query);

  return insertId;
};

const isValidSaleId = async () => {
  const query = 'SELECT id FROM StoreManager.sales;';
  const [existingIds] = await connection.execute(query);
  const ids = existingIds.map(({ id }) => id);

  return ids;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?;';
  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
};

module.exports = {
  insertSale,
  isValidSaleId,
  deleteSale,
};
