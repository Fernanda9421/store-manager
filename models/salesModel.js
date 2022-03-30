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

module.exports = {
  getAllSales,
  getSaleById,
};
