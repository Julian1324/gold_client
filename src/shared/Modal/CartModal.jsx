
const CartModal = ({ show, items, hover, setHover }) => {
    return (
        <>
            {(hover && show) &&
                <div
                    className="position-fixed bg-primary z-3 end-0 me-5 mt-5"
                    style={{ height: '200px' }}
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                >
                    {items.map((item, itemIndex) => {
                        return (
                            <div key={itemIndex}>
                                {item.name}
                            </div>
                        );
                    })}
                </div>
            }
        </>
    )
}

export default CartModal;