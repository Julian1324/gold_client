import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';
import Button from 'react-bootstrap/Button';
import { getCartSlice, getUserSlice } from "../../context/store/store";
import { getProduct, deleteCartItem } from '../../helpers/axiosHelper';

const CartItem = ({ _id, name, image, currentQuantity, price, discount, quantityToBuy, isMobileDevice }) => {
    const { updateQuantity, deleteItem } = getCartSlice();
    const { headers } = getUserSlice();
    const [loadingReqMas, setLoadingReqMas] = useState(false);
    const [loadingReqMenos, setLoadingReqMenos] = useState(false);
    const [count, setCount] = useState(quantityToBuy);
    const [myCurrentQuantity, setMyCurrentQuantity] = useState(currentQuantity);
    const [isChecked, setIsChecked] = useState(true);

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    const XICON = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='position-absolute top-0 end-0 m-2'
                style={{ width: '24', height: '24', cursor: 'pointer' }}
                onClick={() => onDeleteItem(_id)}
                viewBox="0 0 256 256"
            >
                <path fill="#dc2626" d="M168.49 104.49L145 128l23.52 23.51a12 12 0 0 1-17 17L128 145l-23.51 23.52a12 12 0 0 1-17-17L111 128l-23.49-23.51a12 12 0 0 1 17-17L128 111l23.51-23.52a12 12 0 0 1 17 17ZM236 128A108 108 0 1 1 128 20a108.12 108.12 0 0 1 108 108m-24 0a84 84 0 1 0-84 84a84.09 84.09 0 0 0 84-84" />
            </svg>
        )
    }

    const onDeleteItem = async (_id) => {
        try {
            deleteItem(_id);
            await deleteCartItem({ headers, _id });
        } catch (error) {
            console.log('Error deleting item', error);
        }
    }

    const increment = async () => {
        setLoadingReqMas(true);
        const response = await getProduct({ _id });
        setLoadingReqMas(response.loadingReq);
        setMyCurrentQuantity(response.data);
        if (response.data < count) {
            return setCount(response.data);
        };
        if (response.data === count) return;
        setCount(count + 1);
        updateQuantity(_id, count + 1);
    }

    const decrement = async () => {
        if (!count) return;
        setLoadingReqMenos(true);
        const response = await getProduct({ _id });
        setLoadingReqMenos(response.loadingReq);
        if (response.data < count) {
            setMyCurrentQuantity(response.data);
            return setCount(response.data);
        }
        if (!(count - 1)) return onDeleteItem(_id);
        setCount(count - 1);
        updateQuantity(_id, count - 1);
    }

    return (
        <>
            <div className="d-flex align-items-center mt-2 bg-light rounded position-relative itemResponsive" style={{ height: '18vh' }}>
                {/* {!isChecked && <DisabledMask />} */}
                <div className='d-flex align-items-center bg-light rounded position-relative headerResponsive'>
                    {!isMobileDevice &&
                        <Form.Check type={'checkbox'} id={'checkbox'} className='ms-4 z-3' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    }
                    <img src={image} className="rounded imgMobile" alt="" style={{ width: '5vw' }} />
                    <div className='d-flex flex-column align-items-top ms-4 marginName'>
                        <h5>{name}</h5>
                        <span className='d-flex mb-2 h-100 align-items-end'>
                            Disponibilidad:
                            {!myCurrentQuantity ?
                                <span className='text-danger ms-1'> Agotado</span>
                                :
                                <span className='text-primary ms-1'> {myCurrentQuantity} unidades </span>
                            }
                        </span>
                    </div>
                </div>
                <div className='d-flex align-items-center counterResponsive'>
                    <div>
                        {!discount ?
                            <div className='text-success ms-4'>
                                {currencyValue(price)} {constants.CURRENCY_NAME}
                            </div>
                            :
                            <div className='d-flex flex-column ms-4'>
                                <div className='text-success'>
                                    {currencyValue(calculateDiscount(price, discount))} {constants.CURRENCY_NAME}
                                </div>
                                <div className='text-decoration-line-through text-secondary'>
                                    {currencyValue(price)} {constants.CURRENCY_NAME}
                                </div>
                            </div>
                        }
                    </div>
                    <div className='d-flex m-5'>
                        <Button variant="outline-secondary" style={{ width: '35px' }} onClick={() => decrement()}>
                            {loadingReqMenos ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : '-'}
                        </Button>
                        <Form.Control type="text" value={count} readOnly className="mx-2" style={{ width: '35px', textAlign: 'center' }} />
                        <Button variant="outline-secondary" style={{ width: '35px' }} onClick={() => increment()}>
                            {loadingReqMas ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : '+'}
                        </Button>
                    </div>
                </div>
                <XICON />
            </div>
        </>
    )
}

export default CartItem;