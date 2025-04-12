// Cambiar cualquier importación de firebase-admin.js a firebase.js
const { storage } = require('../config/firebase');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/fileController');
const { verifyToken } = require('../middleware/auth');

// Configurar multer para manejar archivos en memoria
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de 5MB
  }
});

// Rutas para archivos
router.post('/upload', verifyToken, upload.single('file'), fileController.uploadFile);
router.get('/', verifyToken, fileController.getFiles);

module.exports = router;