import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProductDetailModal from '../../shared/Modal/productDetailModal';
import { useState } from 'react';

const CardProduct = ({ name, image, body, price }) => {
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

    return (
        <>
            <Card style={{ marginLeft: '1vw' }}>
                <Card.Img src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {body} ${price}
                    </Card.Text>
                    <div className='d-flex justify-content-center'>
                        <Button variant="warning" onClick={onAddToCard}>Añadir al carrito</Button>
                        <Button className='ms-2' variant="light" onClick={onWatchProduct}>Ver</Button>
                    </div>
                </Card.Body>
            </Card>
            <ProductDetailModal
                show={productDetailShow}
                onHide={() => onCloseModal()}
                name={name}
                image={image}
                body={body}
                price={price}
            />
        </>
    )
}

export default CardProduct;