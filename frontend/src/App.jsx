// frontend\src\App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoForm from './components/ProductoForm';
import ProductoList from './components/ProductoList';
import './App.css';

// Usamos el puerto 3001 que es donde corre tu Backend local
const API = 'http://localhost:3001/api';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Función para mostrar alertas simples en caso de error o éxito
  const notif = (texto) => {
    alert(texto);
  };

  useEffect(() => {
    cargar();
  }, []);

  // 1. Cargar los productos desde el Backend (GET)
  const cargar = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/productos`);
      setProductos(data);
    } catch (error) {
      notif('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  // 2. Guardar o actualizar un producto (POST / PUT)
  const guardar = async (form) => {
    try {
      if (productoEditar) {
        // Modo Edición
        await axios.put(`${API}/productos/${productoEditar.id}`, form);
        notif('Producto actualizado con éxito');
        setProductoEditar(null);
      } else {
        // Modo Nuevo
        await axios.post(`${API}/productos`, form);
        notif('Producto guardado con éxito');
      }
      cargar(); // Recarga la lista
    } catch (error) {
      notif('Error al guardar el producto');
    }
  };

  // 3. Eliminar un producto (DELETE)
  const eliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await axios.delete(`${API}/productos/${id}`);
      notif('Producto eliminado');
      cargar(); // Recarga la lista
    } catch (error) {
      notif('Error al eliminar el producto');
    }
  };

  const cancelarEdicion = () => {
    setProductoEditar(null);
  };

  return (
    <div className='app-container' style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Panel de Administración del Inventario</h1>
        <p>Práctica de Laboratorio — Programación Web</p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* Componente del Formulario */}
        <ProductoForm 
          onGuardar={guardar} 
          productoEditar={productoEditar} 
          onCancelar={cancelarEdicion} 
        />

        {/* Estado de carga */}
        {loading && <p style={{ textAlign: 'center' }}>Cargando productos...</p>}

        {/* Componente de la Lista en Tarjetas */}
        <ProductoList 
          productos={productos} 
          onEditar={setProductoEditar} 
          onEliminar={eliminar} 
        />
      </main>
    </div>
  );
}