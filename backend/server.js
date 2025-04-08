const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
// Comentado temporalmente para permitir que el servidor inicie sin MongoDB
// Para usar MongoDB, descomenta estas líneas y asegúrate de que MongoDB esté instalado y ejecutándose
/*
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));
*/
console.log('MongoDB no está instalado en el sistema. El servidor funcionará sin conexión a la base de datos.');

// Rutas base
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor backend en el puerto ${PORT}`));