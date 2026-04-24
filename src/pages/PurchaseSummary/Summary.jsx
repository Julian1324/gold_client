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
    const { getLastMovement, headers } = getUserSlice();
    const [movement, setMovement] = useState(null);
    const [summaryState, setSummaryState] = useState({
        status: 'loading',
        message: 'Cargando resumen...'
    });

    useEffect(() => {
        const currentMovement = getLastMovement();

        if (!Object.keys(headers).length) {
            setSummaryState({
                status: 'error',
                message: 'No pudimos validar tu sesion para mostrar el resumen.'
            });
            return;
        }

        if (typeof currentMovement === 'string') {
            setSummaryState({
                status: 'error',
                message: currentMovement
            });
            return;
        }

        if (hasValidMovementData(currentMovement)) {
            setMovement(currentMovement);
            setSummaryState({
                status: 'ready',
                message: ''
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const timeoutId = setTimeout(() => {
            setSummaryState({
                status: 'error',
                message: 'No se pudo generar el resumen de la compra.'
            });
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, [getLastMovement, headers]);

    if (summaryState.status === 'error') {
        return (
            <Container className='mt-5 myContainer summaryShell'>
                <div className='bg-light rounded p-4 text-center summaryStateCard'>
                    <div className="alert alert-danger mb-0" role="alert">
                        <div className='fw-bold'>No se pudo generar el resumen</div>
                        <div className='mt-1'>{summaryState.message}</div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={() => navigator('/cart')}>
                        Volver al carrito
                    </button>
                </div>
            </Container>
        );
    }

    if (summaryState.status !== 'ready' || !hasValidMovementData(movement)) {
        return (
            <Container className='mt-5 myContainer summaryShell'>
                <div className='bg-light rounded p-4 text-center summaryStateCard'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando resumen...</span>
                    </div>
                    <div className="mt-2 text-muted">{summaryState.message}</div>
                    <button className="btn btn-link mt-3" onClick={() => navigator('/cart')}>
                        Volver al carrito
                    </button>
                </div>
            </Container>
        );
    }

    return (
        <Container className='mt-5 myContainer'>
            <div className='d-flex flex-column align-items-center bg-light rounded p-4 mb-4 summarySuccessCard'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l4-4a.75.75 0 0 0-1.07-1.07L7.5 9.44 5.53 7.47a.75.75 0 1 0-1.06 1.06l2.5 2.5z" />
                </svg>
                <h4 className='mt-2 mb-0'>Compra exitosa</h4>
            </div>
            <CardMovement movement={movement} daRules={true} />
        </Container>
    );
};

export default Summary;
