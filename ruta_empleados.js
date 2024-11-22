import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /empleado:
 *   get:
 *     description: Consultar todos los empleados
 *     responses:
 *       200:
 *         description: Regresa un arreglo de objetos con los empleados.
 */
router.get('/empleado', async (req, res) => {
  // Ejemplo de respuesta
  res.json([{ id: 1, nombre: 'Juan Pérez', edad: 30 }]);
});

/**
 * @swagger
 * /empleado:
 *   post:
 *     description: Alta de empleados
 *     responses:
 *       200:
 *         description: Regresa un objeto con el resultado de la operación de alta
 */
router.post('/empleado', (req, res) => {
  // Ejemplo de operación de alta
  res.status(201).json({ id: 2, nombre: 'Ana Gómez', edad: 25 });
});

export default router;
