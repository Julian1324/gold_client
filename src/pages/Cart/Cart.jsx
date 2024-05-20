import { getCartSlice } from '../../context/store/store';
import { getUserSlice } from '../../context/store/store';
import CartItem from '../../components/CartItems/CartItem';
import { useCallback, useEffect, useState } from 'react';
import { getCartItems } from '../../helpers/axiosHelper';
import { getCategorySlice } from "../../context/store/store";
import CarritoSVG from '../../components/CartItems/CarritoSVG';
import OrderSummary from '../../components/CartItems/OrderSummary';
import isEqual from 'lodash.isequal';

const Cart = () => {
    const { items, updateItems } = getCartSlice();
    const { headers } = getUserSlice();
    const { getCategoryImageByID } = getCategorySlice();
    const [myItems, setMyItems] = useState([]);
    const getUpdatedItems = useCallback(() => {
        return myItems.map(({_id, name, image, price, discount, quantityToBuy}) => ({
            _id,
            name,
            image,
            price,
            discount,
            quantityToBuy
        }));
    }, [myItems]);

    useEffect(() => {
        if (!items.length) return;
        const getMyCartItems = async () => {
            const response = await getCartItems({ items });
            const unifiedArray = response.data.map(item => {
                const matchingItem = items.find(i => i._id === item._id);
                if (matchingItem) return {
                    ...item,
                    image: matchingItem.image,
                    quantityToBuy: matchingItem.quantityToBuy
                }
                return item;
            });
            setMyItems([...unifiedArray]);
        }
        window.scrollTo(0, 0);
        getMyCartItems();
    }, [items, getCategoryImageByID]);

    useEffect(() => {
        if(!myItems.length) return;
        const updatedItems = getUpdatedItems();
        if (!isEqual(updatedItems, items)) return updateItems(updatedItems);
    }, [getUpdatedItems, updateItems, myItems]);

    const CartComponent = () => {
        return (
            <div className="d-flex justify-content-center vh-100 bg-secondary-subtle">
                <div className="d-flex flex-column">
                    <h3 className='mt-4'>
                        Carro de compras
                    </h3>
                    {myItems.map((item, itemIndex) =>
                        <CartItem
                            _id={item._id}
                            name={item.name}
                            image={item.image}
                            currentQuantity={item.quantity}
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
                    <OrderSummary myItems={myItems} />
                </div>
            </div>
        )
    }

    const NoItemsComponent = () => {
        return (
            <div className="d-flex justify-content-center bg-secondary-subtle" style={{ height: '70vh' }}>
                <div className='d-flex mt-5' style={{ height: '10vw' }}>
                    <CarritoSVG />
                    <div className='d-flex flex-column justify-content-center'>
                        <h5>Tu Carrito está vacío</h5>
                        {!!Object.keys(headers).length
                            ? <>Ve a la tienda a escoger los productos <br /> que deseas comprar.</>
                            : <>Inicia sesión para ver los productos que <br /> habías guardado en tu Carrito.</>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {!!items.length ? <CartComponent /> : <NoItemsComponent />}
        </>
    )
}

export default Cart;