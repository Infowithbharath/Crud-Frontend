import React from "react";
import { categories } from "../utils/constants";

const ProductForm = ({ product, onSubmit, onCancel, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Convert price fields to numbers
    const numericFields = ["price", "oldPrice"];
    const newValue = numericFields.includes(name)
      ? parseFloat(value) || 0
      : type === "checkbox"
      ? checked
      : value;

    onChange({
      ...product,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Old Price:</label>
        <input
          type="number"
          name="oldPrice"
          value={product.oldPrice}
          onChange={handleInputChange}
          min="0"
          step="0.01"
        />
      </div>
      
      <div className="form-group">
        <label>Category:</label>
        <select
          name="category"
          value={product.category}
          onChange={handleInputChange}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={product.isActive}
            onChange={handleInputChange}
          />
          Is Active
        </label>
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          rows="4"
        />
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          {product._id ? "Update" : "Add"} Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;