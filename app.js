import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entorno
dotenv.config();

const app = express();

// Cargar la especificación OpenAPI
const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json', 'utf8'));

// Ruta de la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint de ejemplo
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola, mundo!' });
});

// Puerto desde las variables de entorno o por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
