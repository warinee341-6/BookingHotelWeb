import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function TabBar() {
    const [user, setUser] = useState({ role: null, userId: null });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:3000/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUser({
                        role: response.data.role,
                        userId: response.data.userId,
                    });
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser({ role: null, userId: null });
                    navigate('/login');
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({ role: null, userId: null });
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg" style={{ fontFamily: 'Cardo, serif' }}>
            <Container>
                <Navbar.Brand as={Link} to="/home">
                    MyApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/search-results">
                            Search
                        </Nav.Link>
                        {user.role === 'ADMIN' && (
                            <Nav.Link as={Link} to="/dashboard">
                                Dashboard
                            </Nav.Link>
                        )}
                        {user.role === 'OWNER' && user.userId && (
                            <Nav.Link as={Link} to={`/hotels/${user.userId}/manage`}>
                                Manage Hotel
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TabBar;