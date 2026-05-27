// backend\src\index.js
const express = require('express');
const cors    = require('cors');
require('dotenv').config();
 
const productosRouter = require('./routes/productos');
const app  = express();
const PORT = process.env.PORT || 3001;
 
// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
 
// Rutas
app.use('/api/productos', productosRouter);

// Ruta de prueba (Health Check)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', os: 'windows', ts: new Date().toISOString() });
});
 
app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});