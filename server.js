import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear la aplicación Express
const app = express();
const port = process.env.PORT || 8083; // Usa el puerto desde el archivo .env

// Configuración de Swagger
const definicionSwagger = {
  openapi: '3.0.0',
  info: {
    title: 'API Empleados',
    version: '1.0.0',
    description: 'API para gestionar empleados',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'Soporte',
      url: 'https://soporte.ejemplo.com',
    },
  },
  servers: [
    {
      url: process.env.HOST_URL || 'http://localhost:8083', // Usa la URL desde las variables de entorno
      description: 'Servidor local',
    },
  ],
};

const opcionesSwaggerJsdoc = {
  definition: definicionSwagger,
  apis: ['./server.js'], // Ruta a este archivo
};

// Generar la especificación Swagger
const especificacionSwagger = swaggerJsDoc(opcionesSwaggerJsdoc);

// Ruta para visualizar la documentación Swagger en la raíz
app.use('/', swaggerUI.serve, swaggerUI.setup(especificacionSwagger));

// Middleware para parsear los cuerpos de las solicitudes
app.use(express.json());

// Ruta GET para la raíz ("/")
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Empleados');
});



// Ruta GET para obtener todos los empleados
/**
 * @swagger
 * /empleado:
 *   get:
 *     description: Consultar todos los empleados
 *     responses:
 *       200:
 *         description: Regresa un arreglo de objetos con los empleados.
 */
app.get('/empleado', (req, res) => {
  res.json([{ nombre: 'Juan', edad: 30 }, { nombre: 'Ana', edad: 25 }]); // Ejemplo de respuesta
});

// Ruta POST para crear un nuevo empleado
/**
 * @swagger
 * /empleado:
 *   post:
 *     description: Alta de empleados
 *     responses:
 *       200:
 *         description: Regresa un objeto con el resultado de la operación de alta
 */
app.post('/empleado', (req, res) => {
  res.status(201).json({ mensaje: 'Empleado creado' });
});

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en ${process.env.HOST_URL || 'http://localhost:8083'}`);
});
