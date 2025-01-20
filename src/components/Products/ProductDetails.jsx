import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const ProductDetail = ({ product, onBack, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: name === 'name' ? value : parseFloat(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  return (
    <div className="card mx-auto" style={{maxWidth: '500px'}}>
      <div className="card-body">
        <button
          onClick={onBack}
          className="btn btn-link back-button mb-3 p-0"
        >
          <ChevronLeft size={20} className="me-2" />
          Back to Products
        </button>
        <h2 className="card-title h4 mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              name="stock"
              value={editedProduct.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <button
            type="submit"
            className="btn btn-edit text-white w-100"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;