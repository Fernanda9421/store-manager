require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

const errorMiddleware = require('./middlewares/errorMiddleware');
const productsRouter = require('./routes/productsRoutes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
