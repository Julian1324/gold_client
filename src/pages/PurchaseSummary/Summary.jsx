import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { getUserSlice } from '../../context/store/store';
import { useNavigate } from 'react-router-dom';
import { timeFormatter } from '../../helpers/timeZoneHelper';
import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';
import './Summary.css';

const Summary = () => {
    const navigator = useNavigate();
    const { updateLastMovement, getLastMovement, headers } = getUserSlice();
    const [movement, setMovement] = useState();

    useEffect(() => {
        if (!Object.keys(headers).length || !Object.keys(getLastMovement()).length) return navigator('/cart');
        setMovement(getLastMovement());
        console.log('getLastMovement()', getLastMovement());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [getLastMovement, updateLastMovement, headers, navigator]);

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    return (
        <Container className='mt-5 myContainer'>
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
                            {movement?.accounts.map((account, accountKey) => {
                                return (
                                    <div key={accountKey} className='mt-2'>
                                        <h5>Producto(s) pagado(s)</h5>
                                        <div>
                                            <li>{account?.product?.name} &nbsp;-&nbsp;
                                                {!account?.product?.discount
                                                    ? <strong>{currencyValue(account.product.price)} {constants.CURRENCY_NAME} (x{account.product.quantityToBuy})</strong>
                                                    : <strong>{currencyValue(calculateDiscount(account.product.price, account.product.discount))} {constants.CURRENCY_NAME} (x{account.product.quantityToBuy})</strong>}
                                            </li>
                                        </div>
                                        <hr className='w-100 mt-3' />
                                        <h5 className='mt-3'>Cuenta(s)</h5>
                                        <li>
                                            Correo: <strong>
                                                {account?.email}
                                            </strong> ({account?.product?.name}) <br />
                                            Contraseña: <strong>{account.password}</strong> <br />
                                            Perfil(es): <strong>
                                                {account.profiles
                                                    ? account.profiles.map((profile, profileIndex) => {
                                                        if ((profileIndex + 1) !== account.profiles.length) return profile.name + ' - ';
                                                        return profile.name;
                                                    })
                                                    : account.profilesResult.map((profile, profileIndex) => {
                                                        if ((profileIndex + 1) !== account.profilesResult.length) return profile.name + ' - ';
                                                        return profile.name;
                                                    })
                                                }
                                            </strong>
                                        </li>
                                    </div>
                                );
                            })}
                            <h5 className='mt-4'>REGLAS:</h5>
                            <div className='mt-1'>
                                No elimines, agregues, ni invadas perfiles 🚫; no compartas la cuenta 🔒; y no cambies datos como imagen, nombre, PIN, correo o contraseña ✋. <br />
                                <strong>Si incumples, perderás la garantía.</strong>
                            </div>
                            <h5 className='mt-4'>Valor pagado</h5>
                            <h4 className='text-success'>{currencyValue(movement?.amount)} {constants.CURRENCY_NAME}</h4>
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