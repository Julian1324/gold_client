import { useNavigate } from 'react-router-dom';
import { getUserSlice, getCartSlice } from '../../context/store/store';
import { currencyValue } from '../../helpers/currencyHelper';
import { UserNav } from '../UserNav/UserNav';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { constants } from '../../context/constants';
import { AlertModal } from '../Modal/AlertModal';

const FixedNavbarMobile = () => {

    const navigator = useNavigate();
    const { items, getSubtotal } = getCartSlice();
    const { headers, updateUserName, updateHeaders } = getUserSlice();
    const isLogged = Boolean(Object.keys(headers).length);
    const [userOptions, setUserOptions] = useState(false);
    const [alertModalShow, setAlertModalShow] = useState(false);
    const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });

    const Shop = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4 7h16v16H4zm4 2V5c0-2.21 1.795-4 4-4h0c2.21 0 4 1.795 4 4v4" /></svg>
        )
    }

    const repeatedStyle = "d-flex flex-column align-items-center justify-content-end";

    const Home = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m2.25 12l8.955-8.955a1.124 1.124 0 0 1 1.59 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
        )
    }

    const Cart = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
        )
    }

    const onClickUserNav = () => {
        if (!isLogged) return navigator('/signin');
        setUserOptions((prevState) => !prevState);
    }

    const onCloseModal = () => {
        setAlertModalShow(false);
        updateHeaders('');
        updateUserName('');
        navigator('/');
    }

    const signOut = () => {
        localStorage.clear();
        setAlertModalShow(true);
        setMessagesToModal({ title: constants.MODAL_TITLE_SIGNOUT, body: constants.MODAL_BODY_SIGNOUT });
    }

    const UserOptions = () => {
        return (
            <Dropdown.Menu show className='position-relative bottom-50'>
                <Dropdown.Item eventKey="1" onClick={() => navigator('/account')}>Mi cuenta</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => navigator('/movements')}>Pedidos</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" onClick={signOut}>Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
        )
    }

    return (
        <>

            <div
                className="bg-light fixedMenu"
                style={{ height: '9vh', width: '100dvw', zIndex: '99' }}
            >
                <div className="d-flex w-100 h-100 justify-content-around" style={{ fontSize: '0.85rem' }}>

                    <div className={repeatedStyle} onClick={() => navigator('/')}>
                        <Home />
                        <span>Inicio</span>
                    </div>

                    <div className={repeatedStyle} onClick={onClickUserNav}>
                        {userOptions && <UserOptions />}
                        <UserNav letters={false} fixedMobile={true} />
                        {!isLogged && 'Ingreso'}
                    </div>

                    <div className={repeatedStyle} onClick={() => navigator('/shop')}>
                        <Shop />
                        <span>Tienda</span>
                    </div>

                    <div className={repeatedStyle} onClick={() => navigator('/cart')}>
                        {!!items.length &&
                            <span className="position-relative translate-middle badge rounded-pill text-bg-danger notification">
                                {items.length}
                            </span>
                        }
                        <Cart />
                        <span>{currencyValue(getSubtotal())}</span>
                    </div>
                </div>
            </div>
            <AlertModal
                show={alertModalShow}
                onHide={() => onCloseModal()}
                title={messagesToModal.title}
                bodyText={messagesToModal.body}
                closeButton={0}
                timeout={true}
            />
        </>
    )
}

export default FixedNavbarMobile;