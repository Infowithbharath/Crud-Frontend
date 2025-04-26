import React, { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import DeleteModal from "./components/DeleteModal";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";
import { categories } from "./utils/constants";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct({
      name: "",
      price: 0,
      oldPrice: 0,
      category: categories[0],
      isActive: true,
      description: "",
    });
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct._id) {
        // Update existing product
        await updateProduct(currentProduct._id, currentProduct);
      } else {
        // Add new product
        await createProduct(currentProduct);
      }
      loadProducts();
      setIsFormOpen(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete._id);
      loadProducts();
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <h1>Product Management</h1>
      <button className="add-btn" onClick={handleAddProduct}>
        Add Product
      </button>
      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteClick}
      />

      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsFormOpen(false)}>
              &times;
            </span>
            <h2>{currentProduct._id ? "Edit Product" : "Add Product"}</h2>
            <ProductForm
              product={currentProduct}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
              onChange={setCurrentProduct}
            />
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          product={productToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;