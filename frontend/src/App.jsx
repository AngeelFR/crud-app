import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');
  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reemplaza esto con la URL real de tu backend en Render
  const API_URL = "https://tu-backend-en-render.onrender.com/productos";

  // Cargar productos al iniciar
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const prodData = { nombre, precio: Number(precio), categoria, stock: Number(stock) };

    // 1. 👈 PRIMER ALERTA: Nos dirá a qué URL le está pegando
    alert("Intentando enviar a: " + API_URL + "\nDatos: " + JSON.stringify(prodData));

    try {
      if (productoEditar) {
        await fetch(`${API_URL}/${productoEditar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prodData)
        });
        setProductoEditar(null);
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prodData)
        });
      }
      setNombre(''); setPrecio(''); setCategoria(''); setStock('');
      obtenerProductos();
    } catch (error) {
      console.error("Error en el formulario:", error);
      
      // 2. 👈 SEGUNDA ALERTA: Si el servidor de Render rechaza el envío
      alert("💥 ¡TRONÓ LA PETICIÓN! El error real es:\n" + error.message);
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        obtenerProductos();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel de Administración del Inventario</h1>
      <h3>Práctica de Laboratorio — Programación Web</h3>

      <div className="container">
        {/* Columna Izquierda: Formulario */}
        <div className="card">
          <h2>{productoEditar ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre del Producto *</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Precio *</label>
              <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Categoría *</label>
              <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Stock *</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>

            <button type="submit" className="btn-primary">
              {productoEditar ? 'Actualizar Producto' : 'Guardar Producto'}
            </button>
            
            {productoEditar && (
              <button type="button" onClick={() => {
                setProductoEditar(null);
                setNombre(''); setPrecio(''); setCategoria(''); setStock('');
              }} style={{marginTop: '10px', backgroundColor: '#64748b', color: 'white', width: '100%'}}>
                Cancelar Edición
              </button>
            )}
          </form>
        </div>

        {/* Columna Derecha: Lista */}
        <div className="card">
          <h2>Productos en Existencia</h2>
          {loading ? (
            <div className="loading-box">Cargando productos...</div>
          ) : productos.length === 0 ? (
            <div className="empty-box">No hay productos en el inventario. ¡Crea el primero!</div>
          ) : (
            <div className="products-grid">
              {productos.map((prod) => (
                <div key={prod.id} className="product-item">
                  <div className="product-info">
                    <span className="product-category">{prod.categoria}</span>
                    <h4>{prod.nombre}</h4>
                    <p className="product-price">${prod.precio} MXN</p>
                    <p className="product-stock">Stock: {prod.stock} unidades</p>
                  </div>
                  <div className="product-actions">
                    <button onClick={() => {
                      setProductoEditar(prod);
                      setNombre(prod.nombre);
                      setPrecio(prod.precio);
                      setCategoria(prod.categoria);
                      setStock(prod.stock);
                    }} className="btn-edit">Editar</button>
                    <button onClick={() => eliminarProducto(prod.id)} className="btn-delete">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;