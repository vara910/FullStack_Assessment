// src/ItemForm.js
import { useState, useEffect } from 'react';

const ItemForm = ({ item, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: item?.id || null,
    name: item?.name || '',
    quantity: item?.quantity || 0,
    price: item?.price || 0,
    category: item?.category || '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        category: item.category,
      });
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal">
      <h2>{item ? 'Edit Item' : 'Add Item'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          min="0"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          step="0.01"
          min="0"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ItemForm;
