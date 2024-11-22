import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

// Configurar dotenv para cargar variables de entornos
dotenv.config();

const app = express();

// Cargar la especificación OpenAPI
let swaggerDocument;
try {
  const filePath = path.resolve('openapi.json');
  swaggerDocument = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (error) {
  console.error("Error al leer el archivo openapi.json:", error.message);
  process.exit(1); // Finalizar la ejecución si no se puede cargar el archivo
}

// Ruta de la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint de ejemplo
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola, mundo!' });
});

// Puerto desde las variables de entorno o por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  // Cambiar los logs para reflejar la URL correcta en producción
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
