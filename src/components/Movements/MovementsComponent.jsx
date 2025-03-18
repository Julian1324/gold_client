import { timeFormatter } from "../../helpers/timeZoneHelper";
import { currencyValue } from "../../helpers/currencyHelper";
import { constants } from "../../context/constants";
import { Table, Button } from "react-bootstrap";
import { getUserSlice } from "../../context/store/store";
import { getMyMovements } from "../../helpers/axiosHelper";
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { AlertModal } from "../../shared/Modal/AlertModal";
import CardMovement from "../Cards/CardMovement";

const MovementsComponent = ({ paginator, setPaginator, movements, setMovements }) => {

    const { headers } = getUserSlice();
    const [loadingPage, setLoadingPage] = useState({});
    const [alertModalShow, setAlertModalShow] = useState(false);
    const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });

    const onWatchMovement = (id) => {
        const currentMovement = movements[id];
        const myTitle = 'Detalles de pedido';
        const myBody = <CardMovement movement={currentMovement} daRules={false} />;
        setAlertModalShow(true);
        setMessagesToModal({ title: myTitle, body: myBody });
    }

    const handlePages = async (event, pageToQuery) => {
        event.preventDefault();
        if (pageToQuery === paginator.page) return;
        setLoadingPage(prevState => ({
            ...prevState,
            [pageToQuery]: true
        }));

        const { data } = await getMyMovements({ headers, page: pageToQuery });
        const {
            docs, hasNextPage, hasPrevPage, limit, nextPage,
            page, pagingCounter, prevPage, totalDocs, totalPages
        } = data;

        setMovements(docs);

        setPaginator({
            hasNextPage, hasPrevPage, limit, nextPage, page,
            pagingCounter, prevPage, totalDocs, totalPages
        });
        setLoadingPage(prevState => ({
            ...prevState,
            [pageToQuery]: false
        }));
    }

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
                            <th style={{ width: '20rem' }}>Total</th>
                            <th style={{ width: '100px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movements?.map((movement, movementIndex) => (
                            <tr key={movementIndex}>
                                <td>{movement?.consecutive}</td>
                                <td>{timeFormatter(movement?.createdAt)}</td>
                                <td>{constants?.PAYMENT_STATE[movement?.status]}</td>
                                <td>{currencyValue(movement?.amount)} {constants.CURRENCY_NAME}&nbsp;
                                    <span className="fw-bold">para {movement?.accounts?.length} artículo(s)</span>
                                </td>
                                <td onClick={() => onWatchMovement(movementIndex)}>
                                    <Button variant="primary">
                                        VER
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {paginator.prevPage &&
                        <li className="page-item" onClick={(event) => handlePages(event, paginator.prevPage)}>
                            <a className="page-link" href=".">
                                Atrás
                            </a>
                        </li>
                    }
                    {Array(paginator.totalPages).fill('').map((_, pageIndex) => {
                        return (
                            <li
                                className={paginator.page === (pageIndex + 1) ? "page-item active" : "page-item"}
                                key={pageIndex}
                                onClick={(event) => handlePages(event, (pageIndex + 1))}
                            >
                                <a className="page-link" href=".">
                                    {loadingPage[pageIndex + 1] ? <Spinner animation="border" size="sm" /> : (pageIndex + 1)}
                                </a>
                            </li>
                        )
                    })}
                    {paginator.hasNextPage &&
                        <li className="page-item fixedSize" onClick={(event) => handlePages(event, paginator.nextPage)}>
                            <a className="page-link" href=".">
                                Adelante
                            </a>
                        </li>
                    }
                </ul>
            </nav>
            <AlertModal
                show={alertModalShow}
                onHide={() => setAlertModalShow(false)}
                title={messagesToModal.title}
                bodyText={messagesToModal.body}
                size='lg'
                closeButton={0}
            />
        </div>
    )
}

export default MovementsComponent;