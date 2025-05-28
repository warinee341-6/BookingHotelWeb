import { useNavigate } from 'react-router-dom';

function YourComponent() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');  
    };

    return (
        <Button variant="danger" onClick={handleLogout}>
        Logout
        </Button>
    );
}
