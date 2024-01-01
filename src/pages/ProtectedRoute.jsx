import { useEffect } from 'react'
import { useAuth } from '../contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
        } else {
            navigate('/app/cities', { replace: true });
        }
    }, [isAuthenticated])
    if (!isAuthenticated) return null;
    return children;
}