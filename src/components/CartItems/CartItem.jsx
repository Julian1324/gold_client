import Form from 'react-bootstrap/Form';
import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';

const CartItem = ({ _id, name, image, currentQuantity, price, discount, quantityToBuy }) => {

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    return (
        <>
            <div className="d-flex align-items-center mt-2 me-4 bg-light rounded" style={{ height: '15vh' }}>
                <Form.Check type={'checkbox'} id={'checkbox'} className='ms-2' />
                <img src={image} className="rounded ms-2" alt="" style={{ width: '5vw' }} />
                <div className='d-flex flex-column align-items-top ms-2' style={{ height: '5vw', width: '24vw' }}>
                    <h5>{name}</h5>
                    <span className='d-flex mb-2 h-100 align-items-end'>
                        Disponibilidad:
                        {!currentQuantity ?
                            <span className='text-danger ms-1'> Agotado</span>
                            :
                            <span className='text-primary ms-1'> {currentQuantity} unidades </span>
                        }
                    </span>
                </div>
                <div>
                    {!discount ?
                        <div className='text-success'>
                            {currencyValue(price)} {constants.CURRENCY_NAME}
                        </div>
                        :
                        <div className='d-flex flex-column'>
                            <div className='text-success'>
                                {currencyValue(calculateDiscount(price, discount))} {constants.CURRENCY_NAME}
                            </div>
                            <div className='text-decoration-line-through text-secondary'>
                                {currencyValue(price)} {constants.CURRENCY_NAME}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CartItem;