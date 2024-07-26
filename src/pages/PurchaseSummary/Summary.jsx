import { useState } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getCartSlice } from '../../context/store/store';

const Summary = () => {
    const { getItems } = getCartSlice();
    const [ myItems, setMyItems ] = useState(getItems());

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>Resumen de Compra</Card.Header>
            <ListGroup variant="flush">
                {myItems.map((item, index) => (
                    <ListGroupItem key={index}>
                        <div className="d-flex justify-content-between">
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                        </div>
                    </ListGroupItem>
                ))}
                <ListGroupItem>
                    <div className="d-flex justify-content-between">
                        <strong>Total</strong>
                        <strong>200</strong>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </Card>
    );
}

export default Summary;