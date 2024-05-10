import { getCartSlice } from '../../context/store/store';
import CartItem from '../../components/CartItems/CartItem';
import { useEffect } from 'react';

const Cart = () => {
    const { items } = getCartSlice();
    useEffect(() => {
        console.log(items);
    },[items]);
    return (
        <>
            <div className="d-flex justify-content-center vh-100 bg-secondary-subtle">
                <div className="d-flex flex-column" style={{ width: '55vw' }}>
                    <h3 className='mt-4'>
                        Carro de compras
                    </h3>
                    {items.map((item, itemIndex) =>
                        <CartItem
                            _id={item._id}
                            name={item.name}
                            image={item.image}
                            currentQuantity={item.currentQuantity}
                            price={item.price}
                            discount={item.discount}
                            quantityToBuy={item.quantityToBuy}
                            key={itemIndex}
                        />
                    )}
                </div>
                <div className='d-flex flex-column' style={{ width: '20vw' }}>
                    <h3 className='mt-4'>
                        Resumen de la orden
                    </h3>
                    <div className='bg-light rounded v-100'>
                        asd
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;