import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProductDetailModal from '../../shared/Modal/productDetailModal';
import { useState } from 'react';
import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';

const CardProduct = ({ name, image, body, price, discount, quantity, status }) => {
    const [productDetailShow, setProductDetailShow] = useState(false);

    const onAddToCard = () => {
        console.log('Aqui añadimos al carrito');
    }

    const onWatchProduct = () => {
        setProductDetailShow(true);
    }

    const onCloseModal = () => {
        setProductDetailShow(false);
    }

    const CarritoSVG = () => {
        return <svg className='ms-1' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M2.997 3.496a.5.5 0 0 1 .5-.5h.438c.727 0 1.145.473 1.387.945c.165.323.284.717.383 1.059H16a1 1 0 0 1 .962 1.272l-1.496 5.275A2 2 0 0 1 13.542 13H8.463a2 2 0 0 1-1.93-1.473l-.642-2.355a.513.513 0 0 1-.01-.032L4.85 5.643l-.1-.337c-.1-.346-.188-.652-.32-.909c-.159-.31-.305-.4-.496-.4h-.438a.5.5 0 0 1-.5-.5M6.845 8.87l.653 2.396a1 1 0 0 0 .965.736h5.08a1 1 0 0 0 .961-.727L16 6H6zM10 15.499a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0m6 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0" /></svg>
    }

    const EyeSVG = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0" /></svg>
    }

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    const DisabledMask = () => {
        return (
            <div
                className='d-flex justify-content-center align-items-center z-3 bg-black h-100'
                style={{ marginTop: '-100%', cursor: 'pointer', opacity: '85%' }}
                onClick={onWatchProduct}
            >
                <span className='fs-1 text-danger opacity-100'>
                    Agotado
                </span>
            </div>
        );
    }

    return (
        <>
            {status !== constants.PRODUCT_STATUS_INACTIVE &&
                <Card style={{ marginLeft: '1vw', width: '20vw', marginTop: '2vh' }}>
                    {!quantity ?
                        <div className='d-flex flex-column h-100'>
                            <Card.Img src={image} style={{ cursor: 'pointer' }} onClick={onWatchProduct} />
                            <DisabledMask />
                        </div>
                        :
                        <Card.Img src={image} style={{ cursor: 'pointer' }} onClick={onWatchProduct} />
                    }
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        {!discount ?
                            <Card.Text className='text-success'>
                                {currencyValue(price)} {constants.CURRENCY_NAME}
                            </Card.Text>
                            :
                            <div className='d-flex'>
                                <Card.Text className='text-success'>
                                    {currencyValue(calculateDiscount(price, discount))} {constants.CURRENCY_NAME}
                                </Card.Text>
                                <Card.Text className='text-decoration-line-through text-secondary ms-2'>
                                    {currencyValue(price)} {constants.CURRENCY_NAME}
                                </Card.Text>
                            </div>
                        }
                        <div className='d-flex justify-content-center'>
                            {!!quantity &&
                                <Button variant="warning" className='d-flex ms-2 align-items-center' onClick={onAddToCard}>
                                    Añadir <CarritoSVG />
                                </Button>
                            }
                            <Button className='ms-2' variant="light" onClick={onWatchProduct}><EyeSVG /></Button>
                        </div>
                    </Card.Body>
                </Card>
            }

            <ProductDetailModal
                show={productDetailShow}
                onHide={() => onCloseModal()}
                name={name}
                image={image}
                description={body}
                price={price}
                discount={discount}
                quantity={quantity}
                status={status}
            />
        </>
    )
}

export default CardProduct;