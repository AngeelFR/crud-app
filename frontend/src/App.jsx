return (
  <div style={{ padding: '20px' }}>
    <h1>Panel de Administración del Inventario</h1>
    <h3>Práctica de Laboratorio — Programación Web</h3>

    {/* Este contenedor divide la pantalla en 2 columnas */}
    <div className="container">
      
      {/* Columna Izquierda: El Formulario */}
      <div className="card">
        <h2>{productoEditar ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Producto *</label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Precio *</label>
            <input 
              type="number" 
              value={precio} 
              onChange={(e) => setPrecio(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Categoría *</label>
            <input 
              type="text" 
              value={categoria} 
              onChange={(e) => setCategoria(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Stock *</label>
            <input 
              type="number" 
              value={stock} 
              onChange={(e) => setStock(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-primary">
            {productoEditar ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
          
          {productoEditar && (
            <button type="button" onClick={() => setProductoEditar(null)} style={{marginTop: '10px', backgroundColor: '#64748b', color: 'white', width: '100%'}}>
              Cancelar Edición
            </button>
          )}
        </form>
      </div>

      {/* Columna Derecha: La Lista */}
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