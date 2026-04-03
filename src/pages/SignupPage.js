import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost/smartcart-api/signup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role: 'user' }) // Always 'user'
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('Signup successful! You can now log in.');
            navigate('/login');
        } else {
            alert('Signup failed: ' + (result.message || 'Unknown error'));
        }
    };

    return (
        <div className="auth-container">
        <form className="auth-form" onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default SignupPage;
