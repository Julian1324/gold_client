import { getCartSlice } from '../../context/store/store';
import { getUserSlice } from '../../context/store/store';
import CartItem from '../../components/CartItems/CartItem';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getCartItems, setCart } from '../../helpers/axiosHelper';
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
    const [cartNotice, setCartNotice] = useState({ type: 'idle', message: '' });
    const isMobileDevice = getMobileDevice();
    const itemsSignature = useMemo(() => JSON.stringify(
        items.map(({ _id, quantityToBuy }) => ({ _id, quantityToBuy }))
    ), [items]);
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
            try {
                const response = await getCartItems({ items });
                const validProducts = response?.data?.validProducts || [];
                const invalidProducts = response?.data?.invalidProducts || [];

                const unifiedArray = validProducts.map(item => {
                    const matchingItem = items.find(i => i._id === item._id);
                    const categoryData = getCategoryImageByID(item.category_id);
                    const fallbackImage = categoryData?.image;
                    const resolvedImage = matchingItem?.image || item.imageUrl || item.image || fallbackImage;
                    if (matchingItem) return {
                        ...item,
                        image: resolvedImage,
                        quantityToBuy: matchingItem.quantityToBuy
                    };
                    return { ...item, image: resolvedImage };
                });

                if (invalidProducts.length) {
                    const sanitizedCart = unifiedArray.map(({ _id, quantityToBuy }) => ({ _id, quantityToBuy }));
                    updateItems(sanitizedCart);
                    if (Object.keys(headers).length) {
                        await setCart({ headers, newCart: sanitizedCart });
                    }
                    setCartNotice({
                        type: 'warning',
                        message: 'Algunos productos ya no estan disponibles y se retiraron de tu carrito.'
                    });
                } else {
                    setCartNotice({ type: 'idle', message: '' });
                }

                setMyItems([...unifiedArray]);
            } catch (error) {
                setCartNotice({
                    type: 'error',
                    message: 'No pudimos actualizar tu carrito. Intenta nuevamente.'
                });
            }
        };
        window.scrollTo(0, 0);
        getMyCartItems();
    }, [itemsSignature, getCategoryImageByID]);

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
                    <h3 className={`${isMobileDevice ? 'mt-1' : 'mt-4'}`}>
                        Carro de compras
                    </h3>
                    {cartNotice.type === 'warning' && (
                        <div className='alert alert-warning mt-2 mb-3 cartAlert' role='alert'>
                            {cartNotice.message}
                        </div>
                    )}
                    {cartNotice.type === 'error' && (
                        <div className='alert alert-danger mt-2 mb-3 cartAlert' role='alert'>
                            {cartNotice.message}
                        </div>
                    )}
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
        );
    };

    const NoItemsComponent = () => {
        return (
            <div className="d-flex justify-content-center bg-secondary-subtle noItmsResponsive">
                <div className='d-flex flex-column containerResponsive'>
                    {cartNotice.type === 'warning' && (
                        <div className='alert alert-warning mb-4 cartEmptyAlert' role='alert'>
                            {cartNotice.message}
                        </div>
                    )}
                    {cartNotice.type === 'error' && (
                        <div className='alert alert-danger mb-4 cartEmptyAlert' role='alert'>
                            {cartNotice.message}
                        </div>
                    )}
                    <div className='d-flex'>
                        <CarritoSVG />
                        <div className='d-flex flex-column justify-content-center'>
                            <h5>Tu carrito esta vacio</h5>
                            {!!Object.keys(headers).length
                                ? <>Ve a la tienda a escoger los productos <br /> que deseas comprar.</>
                                : <>Inicia sesion para ver los productos que <br /> habias guardado en tu carrito.</>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {!!items.length ? <CartComponent /> : <NoItemsComponent />}
        </>
    );
};

export default Cart;
