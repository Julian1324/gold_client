import { useEffect, useState } from 'react';
import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';

const OrderSummary = ({ myItems }) => {
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
        if(!myItems.length) return;
        const calculateDiscounts = () => {
            const { counter, totalDiscount } = myItems.reduce((acc, obj) => {
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
            const { counter, totalProducts } = myItems.reduce((acc, obj) => {
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
    }, [myItems]);

    return (
        <div className='bg-light rounded v-100 mt-2 flex-column p-3'>
            <div className='d-flex mb-2 justify-content-between'>
                Productos ({productsSummary.counter})
                <span>{currencyValue(productsSummary.totalProducts)} {constants.CURRENCY_NAME}</span>
            </div>
            <hr className='w-100' />
            {discountsSummary.hasDiscounts
                && <div className='d-flex mt-2 justify-content-between'>
                    Descuentos ({discountsSummary.counter})
                    <span className='text-success'>
                        {currencyValue(discountsSummary.totalDiscount)} {constants.CURRENCY_NAME}
                    </span>
                </div>
            }
        </div>
    )
}

export default OrderSummary;