import { getCartSlice } from '../../context/store/store';
import { getUserSlice } from '../../context/store/store';
import CartItem from '../../components/CartItems/CartItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getCartItems } from '../../helpers/axiosHelper';
import { getCategorySlice } from "../../context/store/store";
import CarritoSVG from '../../components/CartItems/CarritoSVG';
import OrderSummary from '../../components/CartItems/OrderSummary';
import isEqual from 'lodash.isequal';
import './Cart.css';

const Cart = () => {
    const { items, updateItems } = getCartSlice();
    const { headers, getMobileDevice } = getUserSlice();
    const { getCategoryImageByID } = getCategorySlice();
    const [myItems, setMyItems] = useState([]);
    const cartRef = useRef(null);
    const itemsDivRef = useRef(null);
    const itemsRef = useRef([]);
    const [containerHeight, setcontainerHeight] = useState(700);
    const isMobileDevice = getMobileDevice();
    const getUpdatedItems = useCallback(() => {
        return myItems.map(({ _id, name, image, price, discount, quantityToBuy }) => ({
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
        if (!myItems.length) return;
        const updatedItems = getUpdatedItems();
        if (!isEqual(updatedItems, items)) return updateItems(updatedItems);
        if (!cartRef.current && !itemsDivRef.current && !itemsRef.current.length) return;
        const firstItemRef = itemsRef.current[0];
        const proportion = containerHeight / itemsRef.current.length;
        const mobileUnits = isMobileDevice ? 70 + (myItems.length / 50) : 20;
        const recommendedValue = firstItemRef.offsetHeight + firstItemRef.offsetHeight * mobileUnits / 100;
        if (proportion < recommendedValue) setcontainerHeight(recommendedValue * itemsRef.current.length);
    }, [getUpdatedItems, updateItems, myItems, containerHeight, isMobileDevice]);

    const CartComponent = () => {
        return (
            <div
                className="d-flex justify-content-center bg-secondary-subtle cartResponsive"
                ref={cartRef}
                style={{ height: (containerHeight + 'pt') }}
            >
                <div
                    className="d-flex flex-column h-100 contCartResponsive"
                    ref={itemsDivRef}
                >
                    <h3 className='mt-4'>
                        Carro de compras
                    </h3>
                    {myItems.map((item, itemIndex) =>
                        <div
                            className='d-flex justify-content-center'
                            ref={el => itemsRef.current[itemIndex] = el}
                            key={itemIndex}
                        >
                            <CartItem
                                _id={item._id}
                                name={item.name}
                                image={item.image}
                                currentQuantity={item.quantity}
                                price={item.price}
                                discount={item.discount}
                                quantityToBuy={item.quantityToBuy}
                                isMobileDevice={isMobileDevice}
                            />
                        </div>
                    )}
                </div>
                <div className='d-flex flex-column position-relative' style={{ width: '25vw' }}>
                    {!isMobileDevice &&
                        <h3 className='mt-4 position-fixed'>
                            Resumen de la orden
                        </h3>
                    }
                    <OrderSummary myItems={myItems} />
                </div>
            </div>
        )
    }

    const NoItemsComponent = () => {
        return (
            <div className="d-flex justify-content-center bg-secondary-subtle noItmsResponsive">
                <div className='d-flex containerResponsive'>
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