import { useEffect } from 'react'
import { useAuth } from '../contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate])
    if (!isAuthenticated) return null;
    return children;
}