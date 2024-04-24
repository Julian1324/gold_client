import { constants } from "../../context/constants";
import { currencyValue } from "../../helpers/currencyHelper";
import Button from 'react-bootstrap/Button';

const CartModal = ({ show, items, subtotal, hover, setHover }) => {

    const onOpenCart = () => {
        console.log('Abriendo carrito');
    }

    const onFinishShopping = () => {
        console.log('Finalizando compra');
    }

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }

    return (
        <div className="position-relative">
            {(hover && show) &&
                <div
                    className="d-flex flex-column align-items-around position-absolute bg-light text-dark z-3 end-0 mt-5 rounded"
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                    style={{ width: '16vw' }}
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
                                        <div className='text-success'>
                                            {item.quantityToBuy} x {currencyValue(item.price)} {constants.CURRENCY_NAME}
                                        </div>
                                        :
                                        <div className="mt-2">
                                            {item.quantityToBuy} x <span className='text-success'>{currencyValue(calculateDiscount(item.price, item.discount))} {constants.CURRENCY_NAME}</span>
                                        </div>
                                    }
                                </div>

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