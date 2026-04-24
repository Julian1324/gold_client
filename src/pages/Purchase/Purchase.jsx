import { getCartSlice, getUserSlice, getCategorySlice } from '../../context/store/store';
import PurchaseItem from '../../components/CartItems/PurchaseItem';
import { useEffect, useState } from 'react';
import { getCartItems, purchaseItems, setCart } from '../../helpers/axiosHelper';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import BillingForm from '../../components/Forms/BillingForm';
import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';
import ConfirmModal from '../../shared/Modal/ConfirmModal';
import { AlertModal } from '../../shared/Modal/AlertModal';
import './Purchase.css';

const Purchase = () => {
    const navigator = useNavigate();
    const { items, setItems, getSubtotal } = getCartSlice();
    const { headers, getWallet, updateWallet, updateLastMovement } = getUserSlice();
    const { getCategoryImageByID } = getCategorySlice();
    const [myItems, setMyItems] = useState([]);
    const [loadingReq, setLoadingReq] = useState(false);
    const [isBuying, setIsBuying] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [alertModalShow, setAlertModalShow] = useState(false);
    const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });
    const [shouldReturnToCart, setShouldReturnToCart] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState({ type: 'idle', message: '' });
    const [itemsStatus, setItemsStatus] = useState({ type: 'loading', message: 'Cargando tu pedido...' });
    const wallet = getWallet();
    const subtotal = getSubtotal();

    useEffect(() => {
        if (!Object.keys(headers).length) {
            return navigator('/signin');
        }
        if (!items.length && !isBuying) return navigator('/cart');

        const getMyPurchaseItems = async () => {
            try {
                setItemsStatus({ type: 'loading', message: 'Cargando tu pedido...' });
                const response = await getCartItems({ items });
                const validProducts = response?.data?.validProducts || [];
                const invalidProducts = response?.data?.invalidProducts || [];

                const unifiedArray = validProducts.map(item => {
                    const matchingItem = items.find(i => i._id === item._id);
                    const categoryImage = matchingItem?.image || item.imageUrl || item.image || getCategoryImageByID(item.category_id)?.image;
                    if (matchingItem) return {
                        ...item,
                        image: categoryImage,
                        quantityToBuy: matchingItem.quantityToBuy
                    };
                    return { ...item, image: categoryImage };
                });

                if (invalidProducts.length) {
                    const sanitizedCart = unifiedArray.map(({ _id, id, quantityToBuy }) => ({ _id, id, quantityToBuy }));
                    if (Object.keys(headers).length) {
                        await setCart({ headers, newCart: sanitizedCart });
                    }
                    setItems(sanitizedCart);
                    setPurchaseStatus({ type: 'idle', message: '' });
                    setMessagesToModal({
                        title: constants.MODAL_TITLE_ERROR,
                        body: 'Algunos productos ya no estan disponibles y se retiraron de tu carrito.'
                    });
                    setAlertModalShow(true);
                    if (!sanitizedCart.length) {
                        setShouldReturnToCart(true);
                    }
                }

                setMyItems([...unifiedArray]);
                if (unifiedArray.length) {
                    setItemsStatus({ type: 'ready', message: '' });
                } else {
                    setItemsStatus({ type: 'empty', message: 'Tu pedido ya no tiene productos disponibles.' });
                }
            } catch (error) {
                setMyItems([]);
                setItemsStatus({
                    type: 'error',
                    message: 'No pudimos cargar tu pedido. Intenta nuevamente.'
                });
            }
        };

        getMyPurchaseItems();
    }, [items, navigator, headers]);

    const LeftArrow = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M10.589 12.5H15q.213 0 .356-.144t.144-.357t-.144-.356T15 11.5h-4.411l1.765-1.766q.14-.133.14-.34t-.14-.348t-.347-.14q-.208 0-.341.14l-2.389 2.389q-.242.242-.242.565t.242.566l2.389 2.388q.14.14.344.13q.204-.009.344-.15t.14-.347t-.14-.34zm1.414 8.5q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
        );
    };

    const onConfirmModal = () => {
        setPurchaseStatus({ type: 'idle', message: '' });
        setConfirmModalShow(true);
    };

    const onPurchase = async () => {
        try {
            setLoadingReq(true);
            setIsBuying(true);
            setPurchaseStatus({ type: 'loading', message: 'Procesando compra...' });
            const itemsFiltered = myItems.map((item) => ({
                _id: item._id,
                id: item.id,
                quantityToBuy: item.quantityToBuy
            }));
            if (Object.keys(headers).length) await setCart({ headers, newCart: itemsFiltered });
            const response = await purchaseItems({ headers });
            const purchaseResponse = response?.data;
            const purchaseData = purchaseResponse?.data;

            updateWallet(purchaseData?.wallet);
            updateLastMovement(purchaseData?.movement);
            setLoadingReq(false);
            setPurchaseStatus({ type: 'success', message: 'Compra realizada correctamente.' });
            setItems([]);
            navigator('/purchaseSummary');
        } catch (error) {
            setConfirmModalShow(false);
            const errorCode = error?.response?.data?.code;
            const errorMessage = constants.PURCHASE_ERROR_MESSAGES?.[errorCode]
                || error?.response?.data?.message
                || 'No pudimos completar la compra. Intenta nuevamente.';
            setPurchaseStatus({ type: 'error', message: errorMessage });
            setLoadingReq(false);
            setIsBuying(false);
        }
    };

    const onCloseAlertModal = () => {
        setAlertModalShow(false);
        if (shouldReturnToCart) {
            setShouldReturnToCart(false);
            navigator('/cart');
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center bg-secondary-subtle">
                <div className="d-flex flex-column pContResponsive">
                    <h3 className='mt-4'>
                        Tu pedido
                    </h3>
                    <Table striped="rows" className='mt-2 rounded'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th className='text-center'>Cantidad</th>
                                <th className='text-center'>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsStatus.type === 'loading' && (
                                <tr>
                                    <td colSpan={3} className='text-center py-4'>
                                        <div className='d-flex flex-column align-items-center text-muted'>
                                            <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
                                            <span className='mt-2'>{itemsStatus.message}</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {itemsStatus.type === 'error' && (
                                <tr>
                                    <td colSpan={3} className='py-4'>
                                        <div className='alert alert-danger mb-0 text-center' role='alert'>
                                            {itemsStatus.message}
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {itemsStatus.type === 'empty' && (
                                <tr>
                                    <td colSpan={3} className='py-4'>
                                        <div className='alert alert-warning mb-0 text-center' role='alert'>
                                            {itemsStatus.message}
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {itemsStatus.type === 'ready' && myItems.map(({ name, image, price, discount, quantityToBuy }, itemIndex) =>
                                <PurchaseItem
                                    name={name}
                                    image={image}
                                    price={price}
                                    discount={discount}
                                    quantityToBuy={quantityToBuy}
                                    key={itemIndex}
                                />
                            )}
                        </tbody>
                    </Table>
                    <div className='d-flex w-100 justify-content-end'>
                        <div className='d-flex justify-content-evenly align-items-center bg-white rounded totalBox'>
                            <div className='fw-bolder'>Total:</div>
                            <div className='text-success'>{currencyValue(subtotal)} {constants.CURRENCY_NAME}</div>
                        </div>
                    </div>
                    <Button className='keepBuying' variant="primary" onClick={() => navigator('/shop')}><LeftArrow /> Seguir comprando</Button>
                    <h3 className='mt-5'>
                        Detalles de facturacion
                    </h3>
                    <div className='w-100 bg-light rounded p-3 mt-3'>
                        <BillingForm />
                    </div>
                    <h3 className='mt-5'>
                        Metodos de pago
                    </h3>
                    <div className='d-flex flex-column w-100 bg-light rounded p-3 mt-3 mb-4'>
                        {!Object.keys(headers).length
                            ? <div className='d-flex flex-column'>
                                <div>No has iniciado sesion. Inicia sesion para ver los metodos de pago.</div>
                                <Button variant="primary" className='buyButton mt-2' onClick={() => navigator('/signin')} style={{ width: '30%' }}>
                                    Iniciar sesion
                                </Button>
                            </div>
                            : <div className='d-flex flex-column'>
                                <div>
                                    Pago disponible mediante saldo en monedero | Saldo : <span className='text-success'>{currencyValue(wallet)} {constants.CURRENCY_NAME}</span>
                                </div>
                                {(subtotal > wallet) && <span className='text-danger'>No tienes suficiente saldo para realizar la compra. Por favor recarga.</span>}
                                <Button
                                    disabled={subtotal > wallet || loadingReq || itemsStatus.type !== 'ready'}
                                    variant="primary"
                                    className='buyButton'
                                    onClick={onConfirmModal}
                                >
                                    {loadingReq ?
                                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                        :
                                        <div>
                                            Realizar compra
                                        </div>
                                    }
                                </Button>
                                {purchaseStatus.type === 'loading' && (
                                    <div className='text-muted mt-3'>
                                        {purchaseStatus.message}
                                    </div>
                                )}
                                {purchaseStatus.type === 'error' && (
                                    <div className='alert alert-danger mt-3 mb-0' role='alert'>
                                        {purchaseStatus.message}
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ConfirmModal
                show={confirmModalShow}
                onHide={() => setConfirmModalShow(false)}
                title={'Confirmacion de compra'}
                bodyText={'Estas seguro que quieres realizar la compra?'}
                size='md'
                closeButton={0}
                onPurchase={onPurchase}
                loadingReq={loadingReq}
            />

            <AlertModal
                show={alertModalShow}
                onHide={onCloseAlertModal}
                title={messagesToModal.title}
                bodyText={messagesToModal.body}
                size='md'
                closeButton={0}
            />
        </>
    );
};

export default Purchase;
