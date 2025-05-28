import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ children, requiredRole }) {
    const [isValid, setIsValid] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:3000/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUserRole(response.data.role);
                    setIsValid(true);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setIsValid(false);
                });
        } else {
            setIsValid(false);
        }
    }, [token]);

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    if (!isValid) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default PrivateRoute;