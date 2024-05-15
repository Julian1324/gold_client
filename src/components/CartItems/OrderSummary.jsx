import { useEffect, useState } from 'react';
import { getCartSlice } from '../../context/store/store';

const OrderSummary = () => {
    const { items } = getCartSlice();
    // const [discounts, setDiscounts] = useState({ hasDiscounts: false, countDiscounts: 0 });

    useEffect(() => {
        // countDiscounts()
    }, []);

    // const countDiscounts = () => {
    //     const counter = items.reduce((acc, obj) => {
    //         if (!!obj.discount) acc++;
    //         return acc;
    //     }, 0);
    //     setDiscounts({ hasDiscounts: !!counter, countDiscounts: counter })
    //     return counter;
    // }
    return (
        <div className='bg-light rounded v-100 mt-2 flex-column p-3'>
            <div className='mb-2'>
                Productos ({items.length})
            </div>
            <hr />
            {true
                && <div className='mt-2'>Descuentos ()</div>
            }
        </div>
    )
}

export default OrderSummary;