import { constants } from "../context/constants"

export const currencyValue = (value) => {
    return value.toLocaleString(constants.LANGUAGE_TAG, {
        style: 'currency',
        currency: constants.CURRENCY_NAME
    })
}