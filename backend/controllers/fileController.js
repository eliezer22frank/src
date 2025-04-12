const { storage } = require('../config/firebase');
const File = require('../models/File');
const path = require('path');

// Listar todos los archivos almacenados en MongoDB
exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadDate: -1 });
    res.status(200).json({
      success: true,
      count: files.length,
      data: files
    });
  } catch (error) {
    console.error('Error al obtener archivos:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al obtener archivos'
    });
  }
};

// Obtener un archivo específico por ID
exports.getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'Archivo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: file
    });
  } catch (error) {
    console.error('Error al obtener el archivo:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al obtener el archivo'
    });
  }
};

// Subir un archivo a Firebase Storage y guardar referencia en MongoDB
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No se ha proporcionado ningún archivo'
      });
    }

    const bucket = storage.bucket();
    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const filePath = `uploads/${fileName}`;
    const file = bucket.file(filePath);
    
    // Subir el archivo a Firebase Storage
    await file.save(fileBuffer, {
      metadata: {
        contentType: req.file.mimetype,
      }
    });

    // Generar URL pública
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500', // Fecha lejana para URL casi permanente
    });

    // Crear un nuevo registro en MongoDB
    const newFile = new File({
      name: req.file.originalname,
      url: url,
      contentType: req.file.mimetype,
      size: req.file.size,
      path: filePath
    });

    // Guardar el registro en MongoDB
    await newFile.save();

    res.status(201).json({
      success: true,
      data: newFile
    });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al subir el archivo'
    });
  }
};

// Actualizar información de un archivo en MongoDB (sin volver a subirlo)
exports.updateFile = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere un nombre para actualizar el archivo'
      });
    }

    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'Archivo no encontrado'
      });
    }

    // Actualizar solo el nombre del archivo
    file.name = name;
    await file.save();

    res.status(200).json({
      success: true,
      data: file
    });
  } catch (error) {
    console.error('Error al actualizar el archivo:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al actualizar el archivo'
    });
  }
};

// Eliminar un archivo de Firebase Storage y MongoDB
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'Archivo no encontrado'
      });
    }

    // Eliminar el archivo de Firebase Storage
    try {
      const bucket = storage.bucket();
      await bucket.file(file.path).delete();
    } catch (storageError) {
      console.error('Error al eliminar el archivo de Firebase Storage:', storageError);
      // Continuamos con la eliminación del registro en MongoDB incluso si falla en Storage
    }

    // Eliminar el registro de MongoDB
    await file.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor al eliminar el archivo'
    });
  }
};

// Obtener lista de archivos de Firebase Storage
exports.getFiles = async (req, res) => {
  try {
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles();
    
    const fileList = await Promise.all(files.map(async (file) => {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
      
      return {
        name: file.name,
        url,
        contentType: file.metadata.contentType,
        size: file.metadata.size,
        timeCreated: file.metadata.timeCreated,
      };
    }));
    
    res.status(200).json(fileList);
  } catch (error) {
    console.error('Error getting files:', error);
    res.status(500).json({ message: 'Error getting files' });
  }
};