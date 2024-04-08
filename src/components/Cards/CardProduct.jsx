import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardProduct = ({ name, image, body, price }) => {

    const onAddToCard = () => {
        console.log('Aqui añadimos al carrito');
    }

    const onWatchProduct = () => {
        console.log('Aqui se mira el producto');
    }
    return (
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
    )
}

export default CardProduct;