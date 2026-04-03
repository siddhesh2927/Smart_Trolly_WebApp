import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, price };

        try {
            await axios.post('http://localhost:8080/api/products', newProduct);
            onProductAdded();
            setName('');
            setPrice('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <h2>Add New Product</h2>
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
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
