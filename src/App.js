import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SmartCart from './pages/SmartCart';
import AdminPanel from './pages/AdminPanel';

function PrivateRoute({ children, role }) {
    // Retrieve authentication and role from localStorage
    const isAuth = localStorage.getItem("authenticated") === "true";
    const userRole = localStorage.getItem("role") || "";

    // Redirect to login if not authenticated
    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    // Redirect to home if role does not match
    if (role && userRole !== role) {
        return <Navigate to="/" />;
    }

    // Render the child component if all checks pass
    return children;
}

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected Routes */}
                <Route path="/cart" element={
                    <PrivateRoute role="user">
                        <SmartCart />
                    </PrivateRoute>
                } />
                
                <Route path="/admin" element={
                    <PrivateRoute role="admin">
                        <AdminPanel />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
