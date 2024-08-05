import { useEffect, useState } from "react";
import { getMyMovements } from "../../helpers/axiosHelper";
import { getUserSlice } from "../../context/store/store";
import { Table, Button } from 'react-bootstrap';
import { constants } from "../../context/constants";
import { timeFormatter } from "../../helpers/timeZoneHelper";
import { currencyValue } from "../../helpers/currencyHelper";
import './Movements.css';

const Movements = () => {

    const { headers } = getUserSlice();
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        const getUserMovements = async () => {
            try {
                const response = await getMyMovements({ headers, page: 1 });
                setMovements(response.data.docs);
            } catch (error) {
                console.log('error', error.response.data);
            }
        }
        getUserMovements();
    }, [headers]);

    const NoMovementsComponent = () => {
        return (
            <div className="d-flex justify-content-center bg-secondary-subtle" style={{ height: '70vh' }}>
                <div className='d-flex mt-5' style={{ height: '10vw' }}>
                    <div className='d-flex flex-column justify-content-center'>
                        <h5>Por el momento no cuentas con pedidos realizados...</h5>
                        Los pedidos que realices se listarán en esta sección.
                    </div>
                </div>
            </div>
        )
    }

    const MovementsComponent = () => {
        return (
            <div className="movementContainer">
                <h2>Pedidos</h2>
                <div className="tableContainer">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Pedido</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movements?.map((movement, index) => (
                                <tr key={index}>
                                    <td>{movement?.consecutive}</td>
                                    <td>{timeFormatter(movement?.createdAt)}</td>
                                    <td>{constants?.PAYMENT_STATE[movement?.status]}</td>
                                    <td>{currencyValue(movement?.amount)} {constants.CURRENCY_NAME} &nbsp;
                                        <span className="fw-bold">para {movement?.accountsIDs?.length} artículo(s)</span>
                                    </td>
                                    <td>
                                        <Button variant="primary">
                                            VER
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

    return (
        <>
            {!movements.length ? <NoMovementsComponent /> : <MovementsComponent />}
        </>
    )
}

export default Movements;