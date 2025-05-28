import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'

function Register(){

    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const [form,setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()

        if(form.password!=form.confirmpassword){
            setError('Passwords do not match'); 
            return
        }
        else{
            try {
                await axios.post(`http://localhost:3000/auth/register`,{
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    password: form.password
                })
                alert('You have successfully create account.')
                navigate('/login')
            } catch (error) {
                setError('An error occurred while registering.')
            }
        }  
    }
    
    return (
        <div style={{fontFamily: 'Cardo, serif' }}>
            <div >
                <h1 style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Cardo, serif', fontWeight: '700'}}>Let's create your
                    <br/>account today!
                </h1>
                <p style={{ textAlign: 'center', marginTop: '10px', fontFamily: 'Cardo, serif', fontWeight: '400'}}>Join us to unlock exclusive features and seamless booking experience.
                    <br/>Fast, secure, and easy registration in just a few steps.
                    <br/>Start your journey with us now!
                </p>
                
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Form style={{fontFamily: 'Cardo, serif' , fontWeight:'700'}} onSubmit={handleSubmit}>
                    
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='name'
                                style={{ padding: '10px 20px'}}
                                onChange={handleChange}
                                placeholder="Enter name"
                            />
                            </Form.Group>
                            <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Label>Phone *</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone'
                                style={{ padding: '10px 20px' }}
                                onChange={handleChange}
                                placeholder="Phone number"
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-4 mt-2" >
                            <Form.Label>Email *</Form.Label>
                            <Form.Control type="email" name='email' style={{ padding: '10px 20px'}} onChange={handleChange} placeholder="Enter email"/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-4">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name='password' style={{ padding: '10px 20px'}} onChange={handleChange} placeholder="Password"/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-4">
                            <Form.Label>Confirm Password *</Form.Label>
                            <Form.Control type="password" name='confirmpassword' style={{ padding: '10px 20px'}} onChange={handleChange} placeholder="Confirm Password"/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <div className='text-center'>
                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        </div>
                    </Row>
                    <Row>
                        <div className="text-center">
                            <Button variant="success" style={{ width: '600px',padding: '10px 20px',letterSpacing: '2px', borderRadius:'10px' }} type="submit">Create Account</Button>
                        </div>
                    </Row>
                </Form>
                
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20px' }}>
                <p>Do you have an account? <a href='/login' className='text-success fst-italic fw-bold' >Login</a></p>
            </div>
        </div>
    )
}

export default Register