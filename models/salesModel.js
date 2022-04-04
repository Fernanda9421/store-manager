const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, sa.date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
  ORDER BY sp.sale_id, sp.product_id;`;
  const [sales] = await connection.execute(query);

  if (sales.length === 0) return null;
  return sales;
};

const getSaleById = async (id) => {
  const query = `SELECT sp.product_id AS productId, sp.quantity, sa.date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
  WHERE sa.id = ?
  ORDER BY sp.sale_id, sp.product_id;`;
  const [sale] = await connection.execute(query, [id]);

  if (sale.length === 0) return null;
  return sale;
};

const isValidProductId = async () => {
  const query = 'SELECT id FROM StoreManager.products;';
  const [existingIds] = await connection.execute(query);
  const ids = existingIds.map(({ id }) => id);
  return ids;
};

const createSale = async (salesArray) => {
  const insertSales = 'INSERT INTO StoreManager.sales (`date`) VALUES (NOW());';

  const [{ insertId }] = await connection.execute(insertSales);
  const insert = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (${insertId}, ?, ?);`;

  const saleItem = await salesArray
    .map(({ productId, quantity }) => connection.execute(insert, [productId, quantity]));

  await Promise.all(saleItem);

  return {
    id: insertId,
    itemsSold: salesArray,
  };
};

const updateSale = async (salesArray, id) => {
  const query = `UPDATE StoreManager.sales_products SET product_id = ?, quantity = ?
  WHERE sale_id = ?;`;

  const saleItem = await salesArray
    .map(({ productId, quantity }) => connection.execute(query, [productId, quantity, id]));

  await Promise.all(saleItem);

  return {
    saleId: id,
    itemUpdated: salesArray,
  };
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?;';
  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
};

module.exports = {
  getAllSales,
  getSaleById,
  isValidProductId,
  createSale,
  updateSale,
  deleteSale,
};
