import Modal from 'react-bootstrap/Modal';

const ProductDetailModal = ({ show, onHide, name, image, body, price }) => {
    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>Detalle</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex '>
                    <img src={image} alt="" style={{ height: '30vh' }} />
                    <div className='d-flex flex-column p-4'>
                        <div className='w-100'>{name}</div>
                        <div className='d-flex w-100 align-items-center'>
                            {body} ${price}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ProductDetailModal;