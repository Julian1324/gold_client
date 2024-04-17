import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';
import { getProduct } from '../../helpers/axiosHelper';
import { getCartSlice } from '../../context/store/store';
import { AlertModal } from './AlertModal';

const ProductDetailModal = ({ show, onHide, _id, name, image, description, price, discount, quantity }) => {

    const [count, setCount] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const [loadingReqMas, setLoadingReqMas] = useState(false);
    const [loadingReqMenos, setLoadingReqMenos] = useState(false);
    const [alertModalShow, setAlertModalShow] = useState(false);
    const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });
    const { addItem } = getCartSlice();

    const increment = async () => {
        setLoadingReqMas(true);
        const response = await getProduct({ _id });
        setLoadingReqMas(response.loadingReq);
        setCurrentQuantity(response.data);
        if (response.data < count) {
            setCurrentQuantity(response.data);
            setMessagesToModal({ title: '¡Aviso!', body: `La cantidad de unidades de este producto ha cambiado. Hay ${response.data} unidades.` });
            setAlertModalShow(true);
            return setCount(response.data);
        };
        if (response.data === count) return;
        setCount(count + 1);
    };

    const decrement = async () => {
        if (!count) return;
        setLoadingReqMenos(true);
        const response = await getProduct({ _id });
        setLoadingReqMenos(response.loadingReq);
        if (response.data < count) {
            setCurrentQuantity(response.data);
            setMessagesToModal({ title: '¡Aviso!', body: `La cantidad de unidades de este producto ha cambiado. Hay ${response.data} unidades.` });
            setAlertModalShow(true);
            return setCount(response.data);
        }
        setCount(count - 1);
    };

    const onAddToCard = () => {
        addItem({name, price, discount, quantityToBuy: count});
        setMessagesToModal({title:constants.MODAL_TITLE_SUCCCESS, body: constants.MODAL_ITEM_ADDED});
        setAlertModalShow(true);
        onHide();
    }

    const WhatsAppSVG = () => {
        return <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 258"><defs><linearGradient id="IconifyId18ecd99d1e2c8342" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#1FAF38" /><stop offset="100%" stopColor="#60D669" /></linearGradient><linearGradient id="IconifyId18ecd99d1e2c8343" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#F9F9F9" /><stop offset="100%" stopColor="#FFF" /></linearGradient></defs><path fill="url(#IconifyId18ecd99d1e2c8342)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004" /><path fill="url(#IconifyId18ecd99d1e2c8343)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z" /><path fill="#FFF" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64" /></svg>
    }

    const CarritoSVG = () => {
        return <svg className='ms-1' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M2.997 3.496a.5.5 0 0 1 .5-.5h.438c.727 0 1.145.473 1.387.945c.165.323.284.717.383 1.059H16a1 1 0 0 1 .962 1.272l-1.496 5.275A2 2 0 0 1 13.542 13H8.463a2 2 0 0 1-1.93-1.473l-.642-2.355a.513.513 0 0 1-.01-.032L4.85 5.643l-.1-.337c-.1-.346-.188-.652-.32-.909c-.159-.31-.305-.4-.496-.4h-.438a.5.5 0 0 1-.5-.5M6.845 8.87l.653 2.396a1 1 0 0 0 .965.736h5.08a1 1 0 0 0 .961-.727L16 6H6zM10 15.499a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0m6 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0" /></svg>
    }

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    return (
        <>
            <Modal
                centered
                show={show}
                onHide={onHide}
                size="lg"
            >
                <Modal.Header className='bg-black'>
                    <Modal.Title id="contained-modal-title-vcenter" className='d-flex w-100 justify-content-center'>
                        <h4 className='text-light'>Detalle</h4>
                    </Modal.Title>
                    <CloseButton variant='white' onClick={onHide} />
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex'>
                        <img src={image} alt="" style={{ height: '32vh' }} className='rounded' />
                        <div className='d-flex flex-column ms-5' style={{ width: '100%' }}>
                            <div className='d-flex w-100 justify-content-center'>{name}</div>
                            <div className='d-flex w-100 flex-column justify-content-center h-100'>
                                <div className='mt-3 text-start text-justify'>
                                    {description}
                                </div>
                                <div className='mt-3'>
                                    Disponibilidad:
                                    {!currentQuantity ?
                                        <span className='text-danger'> Agotado</span>
                                        :
                                        <span className='text-primary'> {currentQuantity} unidades </span>
                                    }
                                </div>
                                <div className='text-success mt-2'>
                                    {!discount ?
                                        <p>
                                            {currencyValue(price)} {constants.CURRENCY_NAME}
                                        </p>
                                        :
                                        <div className='d-flex'>
                                            <p>
                                                {currencyValue(calculateDiscount(price, discount))} {constants.CURRENCY_NAME}
                                            </p>
                                            <p className='text-decoration-line-through text-secondary ms-2'>
                                                {currencyValue(price)} {constants.CURRENCY_NAME}
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                            {!!currentQuantity &&
                                <div>
                                    <Form>
                                        <Form.Group controlId="productCounter">
                                            <div className="d-flex align-items-center mb-3">
                                                <Button variant="outline-secondary" onClick={decrement} style={{ width: '50px' }}>
                                                    {loadingReqMenos ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : '-'}
                                                </Button>
                                                <Form.Control type="text" value={count} readOnly className="mx-2" style={{ width: '50px', textAlign: 'center' }} />
                                                <Button variant="outline-secondary" onClick={increment} style={{ width: '50px' }}>
                                                    {loadingReqMas ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : '+'}
                                                </Button>
                                                <Button variant="warning" className='d-flex ms-2 align-items-center' onClick={onAddToCard} disabled={!count}>
                                                    Añadir <CarritoSVG />
                                                </Button>
                                                <Button variant="success" className='d-flex ms-2 align-items-center'>Comprar <WhatsAppSVG /></Button>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </div>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <AlertModal
                show={alertModalShow}
                onHide={() => setAlertModalShow(false)}
                title={messagesToModal.title}
                bodyText={messagesToModal.body}
                size={'md'}
            />
        </>
    );
}

export default ProductDetailModal;