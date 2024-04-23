import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AlertModal({ show, onHide, title, bodyText, size = 'lg', closeButton = 1, icon = 'none', timeModal = undefined }) {
  const myIcons = Object.freeze({
    none: '',
    check: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="#65a30d" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07m12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32M6.7 9.29L9 11.6l4.3-4.3l1.4 1.42L9 14.4l-3.7-3.7l1.4-1.42z"/></svg>

  });

  useEffect(() => {
    if(!timeModal) return;
    setTimeout(() => {
      onHide();
    }, timeModal);
  },[timeModal, onHide]);
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
          <h4>{title} {myIcons[icon]}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {bodyText}
        </p>
      </Modal.Body>
      {!!closeButton &&
        <Modal.Footer>
          <Button onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      }
    </Modal>
  );
}

export { AlertModal };