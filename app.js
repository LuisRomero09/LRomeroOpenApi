import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entornoa
dotenv.config();

const app = express();

// Cargar la especificación OpenAPI
// Asegúrate de que el archivo openapi.json esté en la raíz del proyecto o ajusta la ruta según corresponda
const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json', 'utf8'));

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
  // Cambia los logs para que reflejen la URL correcta en producción
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
