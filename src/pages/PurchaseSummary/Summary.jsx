import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getUserSlice } from '../../context/store/store';
import { useNavigate } from 'react-router-dom';
import CardMovement from '../../components/Cards/CardMovement';
import './Summary.css';

const Summary = () => {
    const navigator = useNavigate();
    const { updateLastMovement, getLastMovement, headers } = getUserSlice();
    const [movement, setMovement] = useState();

    useEffect(() => {
        if (!Object.keys(headers).length || !Object.keys(getLastMovement()).length) return navigator('/cart');
        setMovement(getLastMovement());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [getLastMovement, updateLastMovement, headers, navigator]);

    return (
        <Container className='mt-5 myContainer'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l4-4a.75.75 0 0 0-1.07-1.07L7.5 9.44 5.53 7.47a.75.75 0 1 0-1.06 1.06l2.5 2.5z" />
                </svg>
                <h4 className='mt-2'>¡Compra exitosa!</h4>
            </div>
            <CardMovement movement={movement} daRules={true} />
        </Container>
    );
}

export default Summary;