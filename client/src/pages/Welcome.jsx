import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg from '../assets/images/Heading.png'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'

function Welcome(){

    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/login')
    }

    

    return (
        <div >
            <div style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            }}>
                <h6 style={{ textAlign: 'center' , color: 'white', paddingTop: '250px', fontFamily: 'Cardo, serif', fontWeight: '700', fontSize:'30px'}}>
                    WELCOME TO
                </h6>
                <h1 style={{ textAlign: 'center' , color: 'white', paddingTop: '10px', fontFamily: 'Cardo, serif', fontWeight: '400', fontSize:'180px', letterSpacing: '5px'}}>
                    The Veloria
                </h1>
                <h3 style={{ textAlign: 'center' , color: 'white', paddingTop: '0px', fontFamily: 'Cardo, serif', fontWeight: '400', fontSize:'60px', letterSpacing: '5px'}}>
                    Find Your Perfect Stay
                </h3>
                <div style={{ textAlign:'center', marginTop:'50px', color: 'white', paddingTop: '0px', fontFamily: 'Cardo, serif', fontWeight: '700', fontSize: '10px'}}><Button onClick={goToHome} variant="light" style={{ padding: '10px 70px', color:'#583920' }}>GET START</Button></div>
            </div>
        </div>
    );
}

export default Welcome