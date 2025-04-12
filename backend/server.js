const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Importar rutas
const fileRoutes = require('./routes/files');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Permite todas las conexiones durante el desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rutas base
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Usar rutas
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Error del servidor'
  });
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor backend en el puerto ${PORT}`));

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
  // No cerramos el proceso para que nodemon pueda reiniciarlo
});