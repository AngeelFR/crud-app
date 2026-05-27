// frontend\src\components\ProductoForm.jsx
import { useState, useEffect } from 'react';

const EMPTY = { nombre: '', precio: '', categoria: '', stock: '' };

export default function ProductoForm({ onGuardar, productoEditar, onCancelar }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(productoEditar || EMPTY);
  }, [productoEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.categoria) {
      alert('Completa los campos obligatorios');
      return;
    }
    onGuardar({
      ...form,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock) || 0
    });
    setForm(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit} className='producto-form'>
      <h2>{productoEditar ? 'Editar' : 'Nuevo Producto'}</h2>
      
      <label>Nombre *
        <input 
          type='text' 
          name='nombre' 
          value={form.nombre} 
          onChange={handleChange} 
          required 
        />
      </label>

      <div className='form-row'>
        <label>Precio *
          <input 
            type='number' 
            step='0.01' 
            name='precio' 
            value={form.precio} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Categoría *
          <input 
            type='text' 
            name='categoria' 
            value={form.categoria} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Stock
          <input 
            type='number' 
            name='stock' 
            value={form.stock} 
            onChange={handleChange} 
          />
        </label>
      </div>

      <div className='form-actions'>
        <button type='submit' className='btn btn-success'>
          {productoEditar ? 'Actualizar' : 'Guardar'}
        </button>
        {productoEditar && (
          <button type='button' className='btn btn-secondary' onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}