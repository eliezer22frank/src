# Backend de la Aplicación de Citas

Este backend proporciona una API para gestionar archivos en Firebase Storage y MongoDB.

## Configuración

1. Asegúrate de tener MongoDB instalado y ejecutándose localmente
2. Configura las variables de entorno en el archivo `.env`
3. Instala las dependencias con `npm install`
4. Inicia el servidor con `npm run dev`

## Variables de Entorno

El archivo `.env` debe contener:

```
MONGO_URI=mongodb://localhost:27017/loveapp
PORT=5000

# Firebase Configuration
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
```

## API de Archivos

### Obtener todos los archivos
```
GET /api/files
```

### Obtener un archivo por ID
```
GET /api/files/:id
```

### Subir un archivo
```
POST /api/files
Content-Type: multipart/form-data

form-data:
  file: [archivo a subir]
```

### Actualizar información de un archivo
```
PUT /api/files/:id
Content-Type: application/json

{
  "name": "nuevo_nombre_archivo"
}
```

### Eliminar un archivo
```
DELETE /api/files/:id
```

## Estructura del Proyecto

- `config/` - Configuración de Firebase y otras dependencias
- `controllers/` - Controladores para manejar la lógica de negocio
- `middleware/` - Middleware para procesar solicitudes
- `models/` - Modelos de datos para MongoDB
- `routes/` - Rutas de la API
- `server.js` - Punto de entrada de la aplicación