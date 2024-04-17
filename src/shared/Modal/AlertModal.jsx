import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AlertModal({ show, onHide, title, bodyText, size = 'lg' }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>{title}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {bodyText}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export { AlertModal };