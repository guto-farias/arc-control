import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', quantity: '' });

  // Carregar a lista de produtos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('product').select('*');
      if (!error) {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Função para adicionar um produto
  const handleAddProduct = async () => {
    const { name, category, price, quantity } = newProduct;
    const { data, error } = await supabase.from('product').insert([
      { name, category, price: parseFloat(price), quantity: parseInt(quantity) }
    ]);
    if (!error) {
      setProducts([...products, ...data]);
      setNewProduct({ name: '', category: '', price: '', quantity: '' });
    }
  };

  // Função para remover um produto
  const handleRemoveProduct = async (id) => {
    const { error } = await supabase.from('product').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Função para editar um produto
  const handleEditProduct = async (id, updatedProduct) => {
    const { error } = await supabase
      .from('product')
      .update(updatedProduct)
      .eq('id', id);
    if (!error) {
      setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
    }
  };

  // Renderizar a lista de produtos
  return (
    <div className="product-management-container">
      <h1>Product Management</h1>

      {/* Formulário para adicionar novo produto */}
      <div className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Tabela de produtos */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleEditProduct(product.id, { name: product.name, category: product.category, price: product.price, quantity: product.quantity })}>Edit</button>
                  <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManagement;
