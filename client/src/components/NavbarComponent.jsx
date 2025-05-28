import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavbarComponent() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isUser, setIsUser] = useState(false)
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:3000/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log('Verify response:', response.data); // Debug
                    const role = response.data.role;
                    setIsAdmin(role === 'ADMIN');
                    setIsOwner(role === 'OWNER');
                    setIsUser(role === 'USER')
                })
                .catch((err) => {
                    console.error('Verify error:', err.response?.data || err.message);
                    setError('Failed to verify user');
                    localStorage.removeItem('token');
                    setIsAdmin(false);
                    setIsOwner(false);
                    setIsUser(false)
                    navigate('/login');
                });
        } else {
            setIsAdmin(false);
            setIsOwner(false);
            setIsUser(false)
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAdmin(false);
        setIsOwner(false);
        setIsUser(false)
        navigate('/login');
    };

    return (
        <Navbar expand="lg" style={{ fontFamily: 'Cardo, serif', padding: '2em 10em' }}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" style={{ fontSize: '24px' }}>
                    The Veloria
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" style={{ fontSize: '20px' }}>
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        {
                            isUser && (
                                <Nav.Link as={Link} to="/my-booking">
                                    My Booking
                                </Nav.Link>
                            )
                        }
                        {isAdmin && (
                            <Nav.Link as={Link} to="/adminPage">
                                AdminPage
                            </Nav.Link>
                        )}
                        {(isAdmin || isOwner) && (
                            <Nav.Link as={Link} to="/hotels/manage">
                                Manage Hotels
                            </Nav.Link>
                        )}
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to="/action1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/action2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/something">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {error && <span style={{ color: 'red', marginRight: '10px' }}>{error}</span>}
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;