import Card from 'react-bootstrap/Card';

const CardCategory = ({ image }) => {
    return (
        <Card className='mt-5'>
            <Card.Img variant="top" src={image} />
        </Card>
    )
}

export default CardCategory;