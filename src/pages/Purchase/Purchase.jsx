import { getCartSlice, getUserSlice } from '../../context/store/store';
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

const Purchase = () => {
    const navigator = useNavigate();
    const { items, setItems, getSubtotal } = getCartSlice();
    const { headers, getWallet, updateWallet } = getUserSlice();
    const [myItems, setMyItems] = useState([]);
    const [loadingReq, setLoadingReq] = useState(false);
    const [isBuying, setIsBuying] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const wallet = getWallet();
    const subtotal = getSubtotal();

    useEffect(() => {
        if (!items.length && !isBuying) return navigator('/cart');
        const getMyPurchaseItems = async () => {
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
        getMyPurchaseItems();
    }, [items, navigator, isBuying]);

    const LeftArrow = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.589 12.5H15q.213 0 .356-.144t.144-.357t-.144-.356T15 11.5h-4.411l1.765-1.766q.14-.133.14-.34t-.14-.348t-.347-.14q-.208 0-.341.14l-2.389 2.389q-.242.242-.242.565t.242.566l2.389 2.388q.14.14.344.13q.204-.009.344-.15t.14-.347t-.14-.34zm1.414 8.5q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
        )
    }

    const onConfirmModal = () => setConfirmModalShow(true);

    const onPurchase = async () => {
        try {
            setLoadingReq(true);
            setIsBuying(true);
            const itemsFiltered = myItems.map((item) => ({
                _id: item._id,
                id: item.id,
                quantityToBuy: item.quantityToBuy
            }));
            if (Object.keys(headers).length) await setCart({ headers, newCart: itemsFiltered });
            const response = await purchaseItems({ headers });
            updateWallet(response?.data?.wallet);
            setLoadingReq(response?.loadingReq);
            setItems([]);
            navigator('/purchaseSummary');
        } catch (error) {
            console.log('error', error);
            setLoadingReq(false);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center bg-secondary-subtle">
                <div className="d-flex flex-column w-50 mb-5">
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
                            {myItems.map(({ name, image, price, discount, quantityToBuy }, itemIndex) =>
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
                        <div className='d-flex justify-content-evenly align-items-center bg-white rounded' style={{ width: '40%', height: '6vh' }}>
                            <div className='fw-bolder'>Total:</div>
                            <div className='text-success'>{currencyValue(subtotal)} {constants.CURRENCY_NAME}</div>
                        </div>
                    </div>
                    <Button variant="primary" style={{ width: '30%' }} onClick={() => navigator('/shop')}><LeftArrow /> Seguir comprando</Button>
                    <h3 className='mt-5'>
                        Detalles de facturación
                    </h3>
                    <div className='w-100 bg-light rounded p-3 mt-3'>
                        <BillingForm />
                    </div>
                    <h3 className='mt-5'>
                        Métodos de pago
                    </h3>
                    <div className='d-flex flex-column w-100 bg-light rounded p-3 mt-3 mb-4'>
                        {!Object.keys(headers).length
                            ? <> Lo siento, por el momento no hay métodos de pago disponibles. Por favor ponte en contacto con nosotros o inicie sesión.
                                <Button disabled={true} variant="primary" className='mt-3' style={{ width: '30%' }}>Realizar compra</Button>
                            </>
                            : <div className='d-flex flex-column'>
                                <div>
                                    Pago disponible mediante saldo en monedero | Saldo : <span className='text-success'>{currencyValue(wallet)} {constants.CURRENCY_NAME}</span>
                                </div>
                                {(subtotal > wallet) && <span className='text-danger'>No tienes suficiente saldo para realizar la compra. Por favor recarga.</span>}
                                <Button
                                    disabled={subtotal > wallet}
                                    variant="primary"
                                    className='mt-3'
                                    style={{ width: '30%' }}
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
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ConfirmModal
                show={confirmModalShow}
                onHide={() => setConfirmModalShow(false)}
                title={'Confirmación de compra'}
                bodyText={'¿Estás seguro que quieres realizar la compra?'}
                size='md'
                closeButton={0}
                onPurchase={onPurchase}
                loadingReq = {loadingReq}
            />
        </>
    )
}

export default Purchase;