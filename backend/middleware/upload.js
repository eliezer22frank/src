const multer = require('multer');

// Configurar el almacenamiento en memoria para Multer
const storage = multer.memoryStorage();

// Filtro para validar tipos de archivos
const fileFilter = (req, file, cb) => {
  // Aceptar imágenes, documentos y otros archivos comunes
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('application/pdf') ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'text/plain'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no soportado'), false);
  }
};

// Configurar Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de 5MB
  },
  fileFilter: fileFilter
});

module.exports = upload;