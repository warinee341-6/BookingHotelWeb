import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Button, Form, InputGroup, Row, Col, Dropdown, Card } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import icon from '../assets/images/hotel.png';
import bed from '../assets/images/bed.png';
import startDateIcon from '../assets/images/start.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [roomCounts, setRoomCounts] = useState({
        standard: 0,
        deluxe: 0,
        suite: 0,
        family: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
            }
            try {
                const response = await axios.get('http://localhost:3000/hotels', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data.hotels || []);
                console.log('Initial hotel data:', response.data.hotels);
            } catch (err) {
                console.error('Unauthorized or error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleRoomTypeCountChange = (type, delta) => {
        setRoomCounts((prev) => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta),
        }));
    };

    const handleSearch = () => {
    const searchData = {
        query: searchQuery,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        rooms: Object.entries(roomCounts)
            .filter(([_, count]) => count > 0)
            .map(([type, count]) => ({ type, count })),
        };
        navigate('/search-results', { state: { searchData } });
    };

    const totalSelectedRooms = Object.values(roomCounts).reduce((sum, count) => sum + count, 0);
    const selectedRoomTypes = Object.entries(roomCounts)
        .filter(([_, count]) => count > 0)
        .map(([type, count]) => `${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`)
        .join(', ');

    return (
        <div>
            <div >
                <NavbarComponent />
            </div>
            <div className='text-center' style={{ fontFamily: 'Cardo, serif' }}>
                <h2 style={{ marginTop: '20px', fontWeight: '700' }}>Find your perfect stay</h2>
                <p style={{ marginTop: '20px', fontSize: '20px' }}>Discover amazing deals on hotels, vacation rentals, and more.</p>
                <div>
                    <Form>
                        <Form.Group style={{ marginTop: '4em', marginLeft: '30em', marginRight: '30em' }} controlId="formGroupEmail">
                            <InputGroup>
                                <InputGroup.Text style={{ backgroundColor: 'white', borderRight: 'none', paddingLeft: '1.5em', paddingRight: '1.5em' }}>
                                    <img src={icon} alt="search" style={{ width: '35px', height: '35px' }} />
                                </InputGroup.Text>
                                <Form.Control
                                    style={{ height: '70px', paddingLeft: '1em', paddingRight: '4em', borderLeft: 'none', fontSize: '18px' }}
                                    type="text"
                                    placeholder="Enter hotel name, city, or address (partial match OK)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Row style={{ marginTop: "1em" }} className="d-flex gap-1">
                            <Col xs="auto" style={{ marginLeft: '30em' }}>
                                <Form.Group controlId="formGroupStartDate">
                                    <InputGroup>
                                        <InputGroup.Text style={{ backgroundColor: 'white', borderRight: 'none', paddingLeft: '1.5em', paddingRight: '1.5em' }}>
                                            <img src={startDateIcon} alt="start-date" style={{ width: '35px', height: '35px' }} />
                                        </InputGroup.Text>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Start (dd/mm/yyyy)"
                                            customInput={
                                                <input
                                                    type="text"
                                                    style={{ height: "70px", fontSize: "18px", padding: "10px 20px", width: "220px", borderRadius: "5px", border: "1px solid #ced4da" }}
                                                    className="form-control"
                                                />
                                            }
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <Form.Group controlId="formGroupEndDate">
                                    <InputGroup>
                                        <InputGroup.Text style={{ backgroundColor: 'white', borderRight: 'none', paddingLeft: '1.5em', paddingRight: '1.5em' }}>
                                            <img src={startDateIcon} alt="end-date" style={{ width: '35px', height: '35px' }} />
                                        </InputGroup.Text>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="End (dd/mm/yyyy)"
                                            customInput={
                                                <input
                                                    type="text"
                                                    style={{ height: "70px", fontSize: "18px", padding: "10px 20px", width: "220px", borderRadius: "5px", border: "1px solid #ced4da" }}
                                                    className="form-control"
                                                />
                                            }
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <Form.Group controlId="formGroupRoomType">
                                    <InputGroup>
                                        <InputGroup.Text style={{ backgroundColor: 'white', borderRight: 'none', paddingLeft: '1.5em', paddingRight: '1.5em' }}>
                                            <img src={bed} alt="end-date" style={{ width: '35px', height: '35px' }} />
                                        </InputGroup.Text>
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="outline-secondary"
                                                id="dropdown-room-type"
                                                style={{
                                                    height: "70px",
                                                    fontSize: "18px",
                                                    padding: "10px 20px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #ced4da",
                                                    width: "205px",
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                {totalSelectedRooms > 0 ? selectedRoomTypes : '-- Room type --'}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu style={{ padding: '10px', width: '205px' }}>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span>Standard</span>
                                                        <div>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleRoomTypeCountChange('standard', -1)}>-</Button>
                                                            <span style={{ margin: '0 10px' }}>{roomCounts.standard}</span>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleRoomTypeCountChange('standard', 1)}>+</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span>Deluxe</span>
                                                        <div>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleRoomTypeCountChange('deluxe', -1)}>-</Button>
                                                            <span style={{ margin: '0 10px' }}>{roomCounts.deluxe}</span>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleRoomTypeCountChange('deluxe', 1)}>+</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span>Suite</span>
                                                        <div>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleRoomTypeCountChange('suite', -1)}>-</Button>
                                                            <span style={{ margin: '0 10px' }}>{roomCounts.suite}</span>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleRoomTypeCountChange('suite', 1)}>+</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span>Family</span>
                                                        <div>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleRoomTypeCountChange('family', -1)}>-</Button>
                                                            <span style={{ margin: '0 10px' }}>{roomCounts.family}</span>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleRoomTypeCountChange('family', 1)}>+</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <div xs="auto" className="text-center">
                                <Button variant="success" style={{ marginTop: '1em', padding: '10px 20px', letterSpacing: '2px', borderRadius: '10px', height: '70px', width: '950px' }} onClick={handleSearch}>Search Hotels</Button>
                            </div>
                        </Row>
                    </Form>
                </div>
                
            </div>
        </div>
    );
}

export default Home;