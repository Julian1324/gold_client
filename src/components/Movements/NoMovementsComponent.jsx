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

export default NoMovementsComponent;