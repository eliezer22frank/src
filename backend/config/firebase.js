const admin = require('firebase-admin');
let db, auth, storage;

// Usar un nombre de app único para evitar conflictos
try {
  // Intentar obtener la app existente
  const app = admin.app('love-dating-app');
  db = app.firestore();
  auth = app.auth();
  storage = app.storage();
} catch (error) {
  // Si no existe, inicializar con el archivo de credenciales
  const serviceAccount = require('../serviceAccountKey.json');
  
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: serviceAccount.project_id + ".appspot.com"
  }, 'love-dating-app'); // Nombre único para la app
  
  db = app.firestore();
  auth = app.auth();
  storage = app.storage();
}

module.exports = { admin, db, auth, storage };