import React from "react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    const num = typeof price === "number" ? price : parseFloat(price) || 0;
    return num.toFixed(2);
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Old Price</th>
          <th>Category</th>
          <th>Active</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${formatPrice(product.oldPrice)}</td>
            <td>{product.category}</td>
            <td>{product.isActive ? "Yes" : "No"}</td>
            <td>{product.description}</td>
            <td>
              <button 
                className="edit-btn" 
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(product)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;