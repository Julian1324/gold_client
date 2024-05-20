import { constants } from "../../context/constants";
import { currencyValue } from "../../helpers/currencyHelper";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getCartSlice } from "../../context/store/store";

const CartModal = ({ show, items, subtotal, hover, setHover }) => {
    const navigator = useNavigate();
    const { deleteItem } = getCartSlice();

    const onOpenCart = () => navigator('/cart');
    const onFinishShopping = () => navigator('/purchase');

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    const XICON = ({ _id }) => {
        return (
            <div style={{ marginTop: '-1vh' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '1.5em', height: '1.5em', cursor: 'pointer' }}
                    onClick={() => onDeleteItem(_id)}
                    viewBox="0 0 256 256"
                >
                    <path fill="#dc2626" d="M168.49 104.49L145 128l23.52 23.51a12 12 0 0 1-17 17L128 145l-23.51 23.52a12 12 0 0 1-17-17L111 128l-23.49-23.51a12 12 0 0 1 17-17L128 111l23.51-23.52a12 12 0 0 1 17 17ZM236 128A108 108 0 1 1 128 20a108.12 108.12 0 0 1 108 108m-24 0a84 84 0 1 0-84 84a84.09 84.09 0 0 0 84-84" />
                </svg>
            </div>
        )
    }

    const onDeleteItem = (_id) => deleteItem(_id);

    return (
        <div className="position-relative">
            {(hover && show) &&
                <div
                    className="d-flex flex-column align-items-around position-absolute bg-light text-dark z-3 end-0 mt-5 rounded"
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                    style={{ width: '17.5vw' }}
                >
                    <div className="d-flex w-100 justify-content-center align-items-center bg-secondary-subtle text-secondary rounded-top" style={{ height: '3.5vh' }}>
                        Carro de compras
                    </div>
                    {items.map((item, itemIndex) => {
                        return (
                            <div className="d-flex mt-2" key={itemIndex}>
                                <img src={item.image} className="rounded ms-1 mb-1" alt="" style={{ width: '5vw' }} />
                                <div className="d-flex flex-column align-items-center justify-content-center ms-2 w-100" style={{ fontSize: '0.9rem' }}>
                                    <div>{item.name}</div>
                                    {!item.discount ?
                                        <div>
                                            {item.quantityToBuy} x <span className='text-success'>{currencyValue(item.price)} {constants.CURRENCY_NAME}</span>
                                        </div>
                                        :
                                        <div className="mt-2">
                                            {item.quantityToBuy} x <span className='text-success'>{currencyValue(calculateDiscount(item.price, item.discount))} {constants.CURRENCY_NAME}</span>
                                        </div>
                                    }
                                </div>
                                <XICON _id={item._id} />
                            </div>
                        );
                    })}
                    <hr className="w-100 mt-2" />
                    <div className="d-flex justify-content-center w-100 mt-2">
                        Subtotal <span className="ms-2 text-success">{subtotal} {constants.CURRENCY_NAME}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100">
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center mt-2 w-75" style={{ height: '3vh' }} onClick={onOpenCart}>
                            Ver carro
                        </Button>
                        <Button variant="warning" className="d-flex align-items-center justify-content-center mt-1 mb-2 w-75" style={{ height: '3vh' }} onClick={onFinishShopping}>
                            Finalizar compra
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CartModal;