const connection = require('./connection');
const salesModel = require('./salesModel');

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

const createSale = async (salesArray) => {
  const insertId = await salesModel.insertSale();
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (${insertId}, ?, ?);`;

  const saleItem = await salesArray
    .map(({ productId, quantity }) => connection.execute(query, [productId, quantity]));

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

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
};
