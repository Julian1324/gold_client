import { getCartSlice } from '../../context/store/store';
import PurchaseItem from '../../components/CartItems/PurchaseItem';
import { useEffect, useState } from 'react';
import { getCartItems } from '../../helpers/axiosHelper';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Purchase = () => {
    const navigator = useNavigate();
    const { items } = getCartSlice();
    const [myItems, setMyItems] = useState([]);

    useEffect(() => {
        if (!items.length) return navigator('/cart');
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
    }, [items, navigator]);
    return (
        <>
            <div className="d-flex justify-content-center vh-100 bg-secondary-subtle">
                <div className="d-flex flex-column w-50">
                    <h3 className='mt-4'>
                        Tu pedido
                    </h3>
                    <Table striped="rows" className='mt-2 rounded'>
                        <thead>
                            <tr>
                                <th className='text-center'>Nombre</th>
                                <th className='text-center'>Cantidad</th>
                                <th className='text-center'>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myItems.map(({ name, image, price, quantityToBuy }, itemIndex) =>
                                <PurchaseItem
                                    name={name}
                                    image={image}
                                    price={price}
                                    quantityToBuy={quantityToBuy}
                                    key={itemIndex}
                                />
                            )}
                        </tbody>
                    </Table>
                    <Button variant="primary" className='w-50' onClick={() => navigator('/shop')}>{`<-- Seguir comprando`}</Button>
                    <h3 className='mt-4'>
                        Detalles de facturación
                    </h3>
                </div>
            </div>
        </>
    )
}

export default Purchase;