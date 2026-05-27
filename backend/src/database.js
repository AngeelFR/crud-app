// backend\src\database.js
const Database = require('better-sqlite3');
const path     = require('path');
require('dotenv').config();
 
// Ruta a la base de datos (se crea automáticamente la primera vez)
const dbPath = process.env.DB_PATH || './productos.db';
const db     = new Database(path.resolve(dbPath));
 
// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS productos (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre    TEXT    NOT NULL,
    precio    REAL    NOT NULL,
    categoria TEXT    NOT NULL,
    stock     INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT    DEFAULT (datetime('now'))
  );
`);
 
module.exports = db;