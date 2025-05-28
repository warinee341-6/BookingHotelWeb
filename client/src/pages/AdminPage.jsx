import React from 'react';
import { Container } from 'react-bootstrap';
import TabBar from '../components/TabBar';

function AdminPage() {
    return (
        <div style={{ fontFamily: 'Cardo, serif' }}>
            <TabBar />
            <Container style={{ paddingTop: '70px' }}>
                
            </Container>
        </div>
    );
}

export default AdminPage;