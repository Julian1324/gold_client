import { useEffect, useState } from 'react';
import { getCartSlice } from '../../context/store/store';

const OrderSummary = () => {
    const { items } = getCartSlice();
    const [discountsSummary, setDiscountsSummary] = useState(
        {
            hasDiscounts: false,
            counter: 0,
            totalDiscount: 0
        }
    );
    const [productsSummary, setProductsSummary] = useState(
        {
            counter: 0,
            totalProducts: 0
        }
    );

    useEffect(() => {
        const calculateDiscounts = () => {
            const { counter, totalDiscount } = items.reduce((acc, obj) => {
                if (!!obj.discount) {
                    acc = {
                        ...acc,
                        counter: (acc.counter + 1) || 1,
                        totalDiscount: (acc.totalDiscount + (obj.price * obj.discount / 100))
                            || (obj.price * obj.discount / 100)
                    };
                };
                return acc;
            }, {});
            setDiscountsSummary((prevState) => ({
                ...prevState,
                hasDiscounts: !!counter,
                counter,
                totalDiscount
            }))
        }
        const calculateProductsSummary = () => {
            const { counter, totalProducts } = items.reduce((acc, obj) => {
                acc = {
                    ...acc,
                    counter: (acc.counter + 1) || 1,
                    totalProducts: (acc.totalProducts + obj.price) || obj.price
                }
                return acc;
            }, {});
            setProductsSummary((prevState) => ({
                ...prevState,
                counter,
                totalProducts
            }));
        }
        calculateProductsSummary();
        calculateDiscounts();
    }, [items]);

    return (
        <div className='bg-light rounded v-100 mt-2 flex-column p-3'>
            <div className='mb-2'>
                Productos ({productsSummary.counter}) <span>{productsSummary.totalProducts}</span>
            </div>
            <hr />
            {discountsSummary.hasDiscounts
                && <div className='mt-2'>
                    Descuentos ({discountsSummary.counter}) <span>{discountsSummary.totalDiscount}</span>
                </div>
            }
        </div>
    )
}

export default OrderSummary;