import React, { useState, useEffect } from 'react';
import '../styles/AdminPanel.css'; // Add your styles here

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch data when the component mounts
    useEffect(() => {
        fetchUsers();
        fetchAvailableProducts();
    }, []);

    // Fetch all users
    const fetchUsers = async () => {
        const response = await fetch('http://localhost/smartcart-api/admin_functions.php?action=get_users');
        const data = await response.json();
        setUsers(data);
    };

    // Fetch available products
    const fetchAvailableProducts = async () => {
        const response = await fetch('http://localhost/smartcart-api/admin_functions.php?action=get_available_products');
        const data = await response.json();
        setAvailableProducts(data);
    };

    // Fetch purchases of the selected user
    const fetchPurchases = async (userId) => {
        const response = await fetch('http://localhost/smartcart-api/admin_functions.php?action=get_user_purchases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        const data = await response.json();
        setPurchases(data);
    };

    return (
        <div className="admin-container">
            <h2>Admin Panel</h2>

            {/* Users List */}
            <h3>Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => { setSelectedUser(user.id); fetchPurchases(user.id); }}>
                        {user.username}
                    </li>
                ))}
            </ul>

            {/* Display User Purchases */}
            {selectedUser && (
                <div>
                    <h3>Purchases by {users.find((user) => user.id === selectedUser)?.username}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Barcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase) => (
                                <tr key={purchase.id}>
                                    <td>{purchase.name}</td>
                                    <td>{purchase.price}</td>
                                    <td>{purchase.barcode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Available Products List */}
            <h3>Available Products</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Barcode</th>
                    </tr>
                </thead>
                <tbody>
                    {availableProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.barcode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPanel;
