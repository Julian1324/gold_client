import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { getUserSlice } from '../../context/store/store';
import { useNavigate } from 'react-router-dom';
import { timeFormatter } from '../../helpers/timeZoneHelper';
import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';

const Summary = () => {
    const navigator = useNavigate();
    const { updateLastMovement, getLastMovement, headers } = getUserSlice();
    const [movement, setMovement] = useState();

    useEffect(() => {
        if (!Object.keys(headers).length || !Object.keys(getLastMovement()).length) return navigator('/cart');
        console.log(getLastMovement());
        setMovement(getLastMovement());
    }, [getLastMovement, updateLastMovement, headers, navigator]);

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    return (
        <Container className='mt-5'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l4-4a.75.75 0 0 0-1.07-1.07L7.5 9.44 5.53 7.47a.75.75 0 1 0-1.06 1.06l2.5 2.5z" />
                </svg>
                <h4 className='mt-2'>¡Compra exitosa!</h4>
            </div>
            <Card className="text-center mt-5 mb-5">
                <Card.Header className="custom-header">
                    <Card.Title>Transacción No. {movement?.consecutive}</Card.Title>
                    <Card.Text>{timeFormatter(movement?.createdAt)}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <h5>Producto(s) pagado(s)</h5>
                            {movement?.products.map((product, productKey) => {
                                return (
                                    <div key={productKey}>
                                        <li>{product?.name}&nbsp;-&nbsp;
                                            {!product?.discount
                                                ? <strong>{currencyValue(product.price)} {constants.CURRENCY_NAME}</strong>
                                                : <strong>{currencyValue(calculateDiscount(product.price, product.discount))} {constants.CURRENCY_NAME}</strong>}
                                        </li>
                                    </div>
                                )
                            })}
                            <hr className='w-100 mt-3' />
                            <h5 className='mt-3'>Cuenta(s)</h5>
                            {movement?.accounts.map((account, accountKey) => {
                                return (
                                    <div key={accountKey} className='mt-2'>
                                        <li>
                                            Correo: <strong>{account.email}</strong> <br />
                                            Contraseña: <strong>{account.password}</strong> <br />
                                            Perfil: <strong>Perfil 1</strong>
                                        </li>
                                    </div>
                                );
                            })}
                            <p className='mt-5'>Valor pagado</p>
                            <h4>{currencyValue(movement?.amount)} {constants.CURRENCY_NAME}</h4>
                        </Col>
                    </Row>
                    <hr className='w-100' />
                    <Row className='mt-2'>
                        <Col>
                            <h5>Origen pago</h5>
                            <p>Monedero (saldo en cuenta)</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Summary;