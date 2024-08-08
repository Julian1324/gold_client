import { Card, Row, Col, Button } from 'react-bootstrap';
import { timeFormatter } from "../../helpers/timeZoneHelper";
import { currencyValue } from "../../helpers/currencyHelper";
import { constants } from '../../context/constants';

const CardMovement = ({ movement }) => {

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    const onCopyToClipBoard = () => {
        if (navigator.clipboard) {
            const textToCopy = `Transacción No. ${movement.consecutive}.\n\n${movement?.accounts.map((account) => {
                return `Cuenta(s): \n· Correo: ${account.email} (${account.product.name}), Contraseña: ${account.password},${account.profiles
                    ? account.profiles.map((profile) => { return ` perfil: ${profile.name} ${profile.pin && `-> PIN: ${profile.pin}`}` })
                    : account.profilesResult.map((profile) => { return ` perfil: ${profile.name} ${profile.pin && `-> PIN: ${profile.pin}`}` })}`;
            })}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log("textToCopy");
            }).catch(() => {
                console.log("Error copiando el texto.");
            });
        }
    }

    const TablerCopy = (props) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" /><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" /></g></svg>
        )
    }

    return (
        <Card className="text-center mt-5 mb-5">
            <Card.Header className="custom-header d-flex justify-content-center position-relative">
                <div>
                    <Card.Title>Transacción No. {movement?.consecutive}</Card.Title>
                    <Card.Text>{timeFormatter(movement?.createdAt)}</Card.Text>
                </div>
                <Button className='position-absolute mt-2 me-2 top-0 end-0' variant='secondary' onClick={onCopyToClipBoard} >
                    <TablerCopy />
                </Button>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        {movement?.accounts.map((account, accountIndex) => {
                            return (
                                <div key={accountIndex} className='mt-2'>
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
                                    <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <li>
                                            Correo: <strong>
                                                {account?.email}
                                            </strong> ({account?.product?.name}) <br />
                                        </li>
                                        <div>
                                            Contraseña: <strong>{account.password}</strong> <br />
                                        </div>
                                        {account.profiles
                                            ? account.profiles.map((profile, profileIndex) => {
                                                return (
                                                    <ul key={profileIndex}>
                                                        <li>
                                                            {profile.name}
                                                            {profile.pin && `, PIN: ${profile.pin}`}
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                            : account.profilesResult.map((profile, profileIndex) => {
                                                return (
                                                    <ul key={profileIndex}>
                                                        <li>
                                                            {profile.name}
                                                            {profile.pin && `, PIN: ${profile.pin}`}
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })}
                        // Poner las reglas
                        <h5 className='mt-4'>Valor pagado</h5>
                        <h4 className='text-success'>{currencyValue(movement?.amount)} {constants.CURRENCY_NAME}</h4>
                    </Col>
                </Row>
                <hr className='w-100' />
                <Row className='mt-2'>
                    <Col>
                        <h5>Origen pago</h5>
                        <p>{movement?.paymentMethod}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CardMovement;