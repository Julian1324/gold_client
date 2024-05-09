import { getCartSlice } from '../../context/store/store';
import CartItem from '../../components/CartItems/CartItem';

const Cart = () => {
    const { items } = getCartSlice();
    return (
        <>
            <div className="d-flex justify-content-center vh-100 bg-secondary-subtle">
                <div className="d-flex flex-column" style={{ width: '60vw' }}>
                    <div>
                        Carro de compras
                    </div>
                    {items.map(() => <CartItem/>)}
                </div>
                <div style={{ width: '20vw' }}>
                    Resumen de la orden
                </div>
            </div>
        </>
    )
}

export default Cart;