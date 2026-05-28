return (
  <div>
    <h1>Panel de Administración del Inventario</h1>
    <h3>Práctica de Laboratorio — Programación Web</h3>

    {/* Contenedor principal de dos columnas */}
    <div className="container">
      
      {/* Columna Izquierda: Formulario */}
      <div className="card">
        <h2>{productoEditar ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        {/* Aquí dejas tu formulario como ya lo tenías, solo asegúrate de ponerle className="btn-primary" al botón de Guardar */}
        <form onSubmit={handleSubmit}>
          {/* ... tus inputs de nombre, precio, categoria, stock ... */}
          <button type="submit" className="btn-primary">Guardar</button>
        </form>
      </div>

      {/* Columna Derecha: Lista de Productos */}
      <div className="card">
        <h2>Productos en Existencia</h2>
        
        {loading ? (
          <div className="loading-box">Cargando productos...</div>
        ) : productos.length === 0 ? (
          <div className="empty-box">No hay productos. ¡Crea el primero!</div>
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
                  <button onClick={() => setProductoEditar(prod)} className="btn-edit">Editar</button>
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