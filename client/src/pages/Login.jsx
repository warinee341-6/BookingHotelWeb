import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'



function Login(){

    const [form,setForm] = useState({email:'',password:''})
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:3000/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => navigate('/home', { replace: true }))
                .catch(() => localStorage.removeItem('token'));
        }
    }, [navigate]);

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3000/auth/login`, form)
            localStorage.setItem('token', response.data.token)
            const { role, userId } = response.data
            if (role === 'ADMIN') {
                navigate('/adminPage')
            } else if (role === 'USER') {
                navigate('/home');
            } else if (role === 'OWNER') {
                const hotelResponse = await axios.get(`http://localhost:3000/hotels?user_id=${userId}`, {
                    headers: { Authorization: `Bearer ${response.data.token}` }
                })
                const hotelId = hotelResponse.data[0]?.id
                if (hotelId) {
                    navigate('/home');
                } else {
                    navigate('/home');
                }
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    }

    return (
        <div style={{fontFamily: 'Cardo, serif' }}>
            <div >
                <h1 style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Cardo, serif', fontWeight: '700', }}>Login</h1>
                <p style={{ textAlign: 'center', marginTop: '15px', fontFamily: 'Cardo, serif', fontWeight: '400', fontSize:'20px'}}>Welcome back!</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Form style={{fontFamily: 'Cardo, serif' , fontWeight:'700', marginTop:'30px'}} onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange}/>
                    </Form.Group>
                    <div>
                        <a href='/login' className='text-dark' style={{ textDecoration: 'none' }}>Forget Password?</a>
                    </div>
                    <div className='text-center'>
                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        </div>
                    <div className="text-center mt-5">
                            <Button variant="success" style={{ width: '400px',padding: '10px 20px',letterSpacing: '2px', borderRadius:'10px' }} type="submit">Login</Button>
                    </div>
                </Form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'40px' }}>
                <p>You don't have an account yet? <a href='/register' className='text-success fst-italic fw-bold' >Create Account</a></p>
            </div>
        </div>
    );
}

export default Login