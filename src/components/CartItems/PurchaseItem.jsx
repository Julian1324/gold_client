import { currencyValue } from '../../helpers/currencyHelper';
import { constants } from '../../context/constants';

const PurchaseItem = ({ name, image, price, quantityToBuy }) => {
    return (
        <tr>
            <td className='d-flex align-items-center'>
                <img src={image} className="rounded ms-1" alt="" style={{ width: '5vw' }} />
                <span className='ms-2'>{name}</span>
            </td>
            <td className='text-center align-middle'>{quantityToBuy}</td>
            <td className='text-center align-middle text-success'>{currencyValue(price)} {constants.CURRENCY_NAME}</td>
        </tr>
    )
}

export default PurchaseItem;