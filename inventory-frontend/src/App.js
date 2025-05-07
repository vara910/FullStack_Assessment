// src/App.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ItemForm from './ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://localhost:7183/api/inventory');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7183/api/inventory/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (item) => {
    try {
      console.log('Submitting item:', item);
      if (item.id) {
        await axios.put(`https://localhost:7183/api/inventory/${item.id}`, item);
      } else {
        await axios.post('https://localhost:7183/api/inventory', item);
      }
      fetchItems();
    } catch (error) {
      console.error('Error submitting item:', error);
    }
  };

  return (
    <div className="App">
      <h1>Inventory Manager</h1>
      <button onClick={() => { setShowForm(true); setEditingItem(null); }}>
        Add Item
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>
                <button onClick={() => { setEditingItem(item); setShowForm(true); }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ItemForm
          item={editingItem}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
