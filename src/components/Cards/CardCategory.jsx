import Card from 'react-bootstrap/Card';

const CardCategory = ({ image }) => {
    return (
        <Card className='mt-5' style={{width: '25vw'}}>
            <Card.Img variant="top" src={image} />
        </Card>
    )
}

export default CardCategory;