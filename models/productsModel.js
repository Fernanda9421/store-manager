const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.execute(query);

  if (products.length === 0) return null;
  return products;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);

  if (product.length === 0) return null;
  return product[0];
};

const countRepeatedNames = async ({ name }) => {
  const query = 'SELECT COUNT(name) FROM StoreManager.products  WHERE name = ?;';
  const repeatedName = await connection.execute(query, [name]);
  return repeatedName;
};

const createProduct = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';
  const [retorno] = await countRepeatedNames({ name });
  if (Object.values(retorno[0])[0] !== 0) {
    return null;
  }
  const [product] = await connection.execute(query, [name, quantity]);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
