import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getUserSlice } from '../../context/store/store';
import { useNavigate } from 'react-router-dom';
import CardMovement from '../../components/Cards/CardMovement';
import './Summary.css';

const hasValidMovementData = (movement) => {
    if (!movement || typeof movement !== 'object') return false;
    if (!Array.isArray(movement.accounts)) return false;
    if (!movement.id && !movement._id) return false;
    return true;
};

const Summary = () => {
    const navigator = useNavigate();
    const { updateLastMovement, getLastMovement, headers } = getUserSlice();
    const [movement, setMovement] = useState();
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        const currentMovement = getLastMovement();

        if (!Object.keys(headers).length) return navigator('/cart');

        if (typeof currentMovement === 'string') {
            setMovement(currentMovement);
            return;
        }

        if (hasValidMovementData(currentMovement)) {
            setMovement(currentMovement);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const timeoutId = setTimeout(() => {
            setTimedOut(true);
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, [getLastMovement, updateLastMovement, headers, navigator]);

    if (typeof movement === 'string' || timedOut) {
        return (
            <Container className='mt-5 myContainer d-flex flex-column align-items-center'>
                <div className="text-danger fw-bold">No se pudo generar el resumen</div>
                <div className="text-muted mt-1">{typeof movement === 'string' ? movement : 'No se pudo generar el resumen de la compra.'}</div>
                <button className="btn btn-primary mt-3" onClick={() => navigator('/cart')}>
                    Volver al carrito
                </button>
            </Container>
        );
    }

    if (!hasValidMovementData(movement)) {
        return (
            <Container className='mt-5 myContainer d-flex flex-column align-items-center'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando resumen...</span>
                </div>
                <div className="mt-2 text-muted">Cargando resumen...</div>
                <button className="btn btn-link mt-3" onClick={() => navigator('/cart')}>
                    Volver al carrito
                </button>
            </Container>
        );
    }

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
};

export default Summary;
