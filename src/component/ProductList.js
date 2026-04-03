import React from 'react';
import './ProductList.css'; 

const ProductList = ({ products, onUpdateQuantity, onDeleteProduct, onEditProduct }) => {
    return (
        <div className="product-list">
                   <h2 className="product-list-heading">Product List</h2>
            {products.map(product => (
                <div className="product-item" key={product.id}>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <div className="quantity-controls">
                        <button className="button increase" onClick={() => onUpdateQuantity(product.id, 1)}>+</button>
                        <span>{product.quantity}</span>
                        <button className="button decrease" onClick={() => onUpdateQuantity(product.id, -1)}>-</button>
                        <button className="button edit" onClick={() => onEditProduct(product.id)}>
                            <i className="fas fa-edit icon"></i> Edit
                        </button>
                        <button className="button delete" onClick={() => onDeleteProduct(product.id)}>
                            <i className="fas fa-trash icon"></i> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;