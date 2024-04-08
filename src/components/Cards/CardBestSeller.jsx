import Card from 'react-bootstrap/Card';

const CardBestSeller = ({image, title, body, price}) => {
    return (
        <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {body} ${price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardBestSeller;