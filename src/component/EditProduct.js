import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProduct.css';

const EditProduct = ({ productToEdit, onProductUpdated }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setPrice(productToEdit.price);
        }
    }, [productToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = { ...productToEdit, name, price };

        try {
            await axios.put(`http://localhost:8080/api/products/${productToEdit.id}`, updatedProduct);
            onProductUpdated();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-product-form">
            <h2>Edit Product</h2>
            <div>
                <label>Product Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;
