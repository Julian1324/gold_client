import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const CardCategory = ({ image, categoryID }) => {
    const navigator = useNavigate();

    const toCategory = () => {
        navigator('/category/' + categoryID);
    }
    return (
        <Card className='mt-5 cardCategory' style={{width: '25vw', cursor: 'pointer'}} onClick={toCategory}>
            <Card.Img variant="top" src={image} />
        </Card>
    )
}

export default CardCategory;