// backend\src\routes\productos.js
const express = require('express');
const router  = express.Router();
const db      = require('../database');
 
// GET /api/productos — Leer todos los productos
router.get('/', (req, res) => {
  try {
    const productos = db.prepare(
      'SELECT * FROM productos ORDER BY id DESC',
    ).all();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});
 
// GET /api/productos/:id — Leer un solo producto
router.get('/:id', (req, res) => {
  try {
    const prod = db.prepare(
      'SELECT * FROM productos WHERE id = ?',
    ).get(req.params.id);
    if (!prod) return res.status(404).json({ error: 'No encontrado' });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar' });
  }
});
 
// POST /api/productos — Crear un nuevo producto
router.post('/', (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'Campos obligatorios faltantes' });
  }
  try {
    const r = db.prepare(
      'INSERT INTO productos (nombre,precio,categoria,stock) VALUES (?,?,?,?)'
    ).run(nombre, precio, categoria, stock||0);
    const nuevo = db.prepare('SELECT * FROM productos WHERE id=?')
                    .get(r.lastInsertRowid);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear' });
  }
});
 
// PUT /api/productos/:id — Actualizar un producto existente
router.put('/:id', (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  try {
    const existe = db.prepare('SELECT id FROM productos WHERE id=?')
                     .get(req.params.id);
    if (!existe) return res.status(404).json({ error: 'No encontrado' });
    db.prepare(
      'UPDATE productos SET nombre=?,precio=?,categoria=?,stock=? WHERE id=?'
    ).run(nombre, precio, categoria, stock, req.params.id);
    res.json(db.prepare('SELECT * FROM productos WHERE id=?')
               .get(req.params.id));
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});
 
// DELETE /api/productos/:id — Eliminar un producto
router.delete('/:id', (req, res) => {
  try {
    const r = db.prepare('DELETE FROM productos WHERE id=?')
                .run(req.params.id);
    if (r.changes === 0)
      return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});
 
module.exports = router;