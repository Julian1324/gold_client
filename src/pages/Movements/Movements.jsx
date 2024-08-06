import { useEffect, useState } from "react";
import { getMyMovements } from "../../helpers/axiosHelper";
import { getUserSlice } from "../../context/store/store";
import MovementsComponent from "../../components/Movements/MovementsComponent";
import NoMovementsComponent from "../../components/Movements/NoMovementsComponent";
import './Movements.css';

const Movements = () => {

    const { headers } = getUserSlice();
    const [movements, setMovements] = useState([]);
    const [paginator, setPaginator] = useState();

    useEffect(() => {
        const getUserMovements = async () => {
            try {
                const { data } = await getMyMovements({ headers, page: 1 });
                const {
                    docs, hasNextPage, hasPrevPage, limit, nextPage,
                    page, pagingCounter, prevPage, totalDocs, totalPages
                } = data;

                setMovements(docs);

                setPaginator({
                    hasNextPage, hasPrevPage, limit, nextPage, page,
                    pagingCounter, prevPage, totalDocs, totalPages
                });

            } catch (error) {
                console.log('error', error.response.data);
            }
        }
        getUserMovements();
    }, [headers]);

    return (
        <>
            {!movements.length
                ? <NoMovementsComponent />
                : <MovementsComponent
                    paginator={paginator}
                    setPaginator={setPaginator}
                    movements={movements}
                    setMovements={setMovements}
                />
            }
        </>
    )
}

export default Movements;