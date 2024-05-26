import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';

const PurchaseItem = ({ name, image, price, discount, quantityToBuy }) => {

    const calculateDiscount = (thePrice, theDiscount) => {
        return thePrice - (thePrice * theDiscount / 100);
    }
    return (
        <tr>
            <td className='d-flex align-items-center'>
                <img src={image} className="rounded ms-1" alt="" style={{ width: '5vw' }} />
                <span className='ms-2'>{name}</span>
            </td>
            <td className='text-center align-middle'>{quantityToBuy}</td>
            <td className='text-center align-middle text-success'>{currencyValue(calculateDiscount(price, discount))} {constants.CURRENCY_NAME}</td>
        </tr>
    )
}

export default PurchaseItem;