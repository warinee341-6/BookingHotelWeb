import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';

function SearchResults() {
    const location = useLocation();
    const { searchData } = location.state || {};
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        if (!searchData) return;

        const fetchResults = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3000/hotels/search', searchData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setHotels(response.data.hotels || []);
            } catch (err) {
                console.error('Error fetching search results:', err);
            }
        };

        fetchResults();
    }, [searchData]);

    return (
        <div>
            <NavbarComponent />
            <Container className="mt-5">
                <h2>Search Results</h2>
                {hotels.length === 0 ? (
                    <p>No hotels found.</p>
                ) : (
                    hotels.map((hotel) => (
                        <Card key={hotel.id} className="mb-3">
                            <Card.Body>
                                <Card.Title>{hotel.name}</Card.Title>
                                <Card.Text>{hotel.address}</Card.Text>
                                <Card.Text>{hotel.city}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>
        </div>
    );
}

export default SearchResults;
