import express from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});