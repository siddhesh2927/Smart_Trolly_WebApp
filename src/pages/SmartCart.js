import React, { useState, useEffect } from 'react';
import "../styles/global.css";
import ProductList from '../component/ProductList';
import BarcodeScanner from '../components/BarcodeScanner';
import { QRCodeCanvas } from 'qrcode.react';

function SmartCart() {
    const [availableProducts, setAvailableProducts] = useState([]);
    const [scannedProducts, setScannedProducts] = useState([]);
    const [showQRCode, setShowQRCode] = useState(false);
    const [scannerKey, setScannerKey] = useState(Date.now());
    const [editingProduct, setEditingProduct] = useState(null);
    const [gst, setGST] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        fetch('http://localhost/smartcart-api/fetch_products.php')
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch products");
                return response.json();
            })
            .then((data) => {
                setAvailableProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                alert("Error loading products from server.");
            });
    }, []);

    const handleScan = (barcode) => {
        const product = availableProducts.find((p) => p.barcode === barcode);
        if (product) {
            setScannedProducts((prev) => [...prev, product]);
            alert(`Product added: ${product.name}`);
        } else {
            alert('Product not found for this barcode!');
        }
    };

    const calculateTotalPrice = () => {
        return scannedProducts.reduce((total, product) => total + product.price, 0);
    };

    const handlePay = () => {
        // Generate random GST (5-18%) and Discount (5-20%)
        const randomGST = Math.floor(Math.random() * (18 - 5 + 1)) + 5;
        const randomDiscount = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
        setGST(randomGST);
        setDiscount(randomDiscount);
        setShowQRCode(true);
    };

    const getReceiptData = () => {
        const total = calculateTotalPrice();
        const gstAmount = (gst / 100) * total;
        const discountAmount = (discount / 100) * total;
        const finalAmount = total + gstAmount - discountAmount;
        return { total, gstAmount, discountAmount, finalAmount };
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleSaveEdit = (updatedProduct) => {
        setAvailableProducts(availableProducts.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
        ));
        setScannedProducts(scannedProducts.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
        ));
        setEditingProduct(null);
    };

    const handleDeleteProduct = (productId) => {
        setScannedProducts(scannedProducts.filter(product => product.id !== productId));
    };

    const refreshScanner = () => {
        setScannerKey(Date.now());
    };

    const { total, gstAmount, discountAmount, finalAmount } = getReceiptData();

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="header-title">Smart Shopping Cart</h1>
            </header>
            <main className="App-main">
                <div className="scanner-container">
                    <BarcodeScanner 
                        key={scannerKey}
                        onScan={handleScan}
                    />
                    <button 
                        onClick={refreshScanner} 
                        className="refresh-scanner-button"
                    >
                        Refresh Scanner
                    </button>
                </div>

                <ProductList 
                    products={scannedProducts} 
                    onDeleteProduct={handleDeleteProduct} 
                    onEditProduct={handleEditProduct} 
                />

                {editingProduct && (
                    <div className="edit-modal">
                        <h3>Edit Product</h3>
                        <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({
                                ...editingProduct,
                                name: e.target.value
                            })}
                        />
                        <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({
                                ...editingProduct,
                                price: Number(e.target.value)
                            })}
                        />
                        <button onClick={() => handleSaveEdit(editingProduct)}>Save</button>
                        <button onClick={() => setEditingProduct(null)}>Cancel</button>
                    </div>
                )}

                <div className="summary-section">
                    <div className="total-price-container">
                        <h2>Total Price</h2>
                        <p>₹{total.toFixed(2)}</p>
                    </div>
                    <button onClick={handlePay} className="pay-button">Pay</button>

                    {showQRCode && (
                        <div className="qr-receipt-section">
                            <div className="qr-code">
                                <h3>Scan QR Code for Payment</h3>
                                <QRCodeCanvas value={`Final Payment: ₹${finalAmount.toFixed(2)}`} size={200} />
                                <button 
                                    onClick={() => setShowQRCode(false)} 
                                    className="continue-shopping-button"
                                >
                                    Continue Shopping
                                </button>
                            </div>

                            <div className="receipt">
                                <h3>Receipt</h3>
                                <p>Base Amount: ₹{total.toFixed(2)}</p>
                                <p>GST ({gst}%): ₹{gstAmount.toFixed(2)}</p>
                                <p>Discount ({discount}%): -₹{discountAmount.toFixed(2)}</p>
                                <hr />
                                <h4>Total Payable: ₹{finalAmount.toFixed(2)}</h4>
                                <p>Transaction ID: #{Math.floor(Math.random() * 100000000)}</p>
                                <p>Date: {new Date().toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <footer className="App-footer">
                <p>&copy;{new Date().getFullYear()} MIT ADT. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default SmartCart;
