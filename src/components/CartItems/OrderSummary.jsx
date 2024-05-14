import { useState } from 'react';
import { getCartSlice } from '../../context/store/store';

const OrderSummary = () => {
    const { items } = getCartSlice();
    const [discounts, setDiscounts] = useState(true);
    return (
        <div className='bg-light rounded v-100 mt-2 flex-column p-3'>
            <div className='mb-2'>
                Productos ({items.length})
            </div>
            <hr />
            {discounts
                && <div className='mt-2'>Descuentos ()</div>
            }
        </div>
    )
}

export default OrderSummary;