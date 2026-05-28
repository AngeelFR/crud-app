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

  // ⚠️ 1. CAMBIA ESTE LINK DE ABAJO POR EL TUYO DE RENDER (Debe terminar en /productos)
  // 🔗 Tu URL real de Render enlazada correctamente:
  const API_URL = "https://crud-app-n2yn.onrender.com/productos";

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
    
    // Convertimos los valores a los tipos correctos para la base de datos
    const prodData = { 
      nombre: nombre, 
      precio: Number(precio), 
      categoria: categoria, 
      stock: Number(stock) 
    };

    try {
      let respuesta;
      if (productoEditar) {
        // Editar producto existente
        respuesta = await fetch(`${API_URL}/${productoEditar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prodData)
        });
      } else {
        // Crear nuevo producto
        respuesta = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prodData)
        });
      }

      if (respuesta.ok) {
        alert("¡Producto guardado con éxito!");
        // Limpiar formulario y recargar lista
        setNombre('');
        setPrecio('');
        setCategoria('');
        setStock('');
        setProductoEditar(null);
        obtenerProductos();
      } else {
        const errorData = await respuesta.text();
        alert("❌ El servidor rechazó los datos:\n" + errorData);
      }

    } catch (error) {
      console.error("Error en el formulario:", error);
      alert("💥 Error de red o el servidor está apagado:\n" + error.message);
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (respuesta.ok) {
          alert("Producto eliminado.");
          obtenerProductos();
        } else {
          alert("No se pudo eliminar el producto.");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al conectar con el servidor para eliminar.");
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