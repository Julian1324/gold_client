import { useEffect, useState } from "react";
import { getCartSlice } from "../../context/store/store";
import Button from 'react-bootstrap/Button';

const NewProductModal = () => {
    const [hover, setHover] = useState(false);
    const { items, itemAdded, setItemAdded } = getCartSlice();

    useEffect(() => {
        if (itemAdded) setTimeout(() => {
            setItemAdded(false);
        }, 2000);
    }, [itemAdded, setItemAdded]);

    return (
        <>
            {(hover || itemAdded) &&
                <div className="position-fixed end-0" style={{zIndex: 10}}
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                >
                    <div
                        className="d-flex flex-column align-items-around position-absolute bg-light text-dark z-3 end-0 mt-5 rounded"
                        style={{ width: '17vw' }}
                    >
                        <div className="d-flex w-100 justify-content-center align-items-center bg-secondary-subtle text-secondary rounded-top" style={{ height: '3.5vh' }}>
                            ¡Nuevo item!
                        </div>
                        <div className="d-flex mt-2">
                            <img src={items[items.length - 1].image} className="rounded ms-1 mb-1" alt="" style={{ width: '5vw' }} />
                            <div className="d-flex flex-column align-items-center justify-content-center ms-2 w-100" style={{ fontSize: '0.9rem' }}>
                                <div>{items[items.length - 1].name}</div>
                                <span className="fw-bold">¡Se ha agregado con exito!</span>
                            </div>
                        </div>
                        <Button variant="primary" className="m-1"> Ver carrito</Button>
                    </div>
                </div>
            }
        </>
    );
}

export default NewProductModal;