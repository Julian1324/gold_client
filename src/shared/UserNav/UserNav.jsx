import React, { useEffect, useState } from 'react';
import { getUserSlice, getCartSlice, getCategorySlice } from '../../context/store/store';
import { AlertModal } from '../../shared/Modal/AlertModal';
import { constants } from '../../context/constants';
import { useNavigate } from 'react-router-dom';
import { currencyValue } from '../../helpers/currencyHelper';
import { getUser } from '../../helpers/axiosHelper';
import './UserNav.css';

const UserNav = ({ letters, fixedMobile }) => {
  const navigator = useNavigate();
  const [hover, setHover] = useState(false);
  const { userName, headers, updateUserName, updateHeaders, getWallet, updateWallet } = getUserSlice();
  const { setItems } = getCartSlice();
  const { getCategoryImageByID } = getCategorySlice();
  const [alertModalShow, setAlertModalShow] = useState(false);
  const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });
  const { getMobileDevice } = getUserSlice();
  const isMobileDevice = getMobileDevice();

  useEffect(() => {
    const getTheUser = async () => {
      if (!Object.keys(headers).length) return;
      try {
        const theUser = await getUser({ headers });
        if (theUser?.data?.cart.length) {
          const userProducts = theUser?.data?.cart.map((product) => ({ ...product, ...getCategoryImageByID(product.category_id) }));
          setItems(userProducts);
        } else {
          setItems([]);
        }
        updateWallet(theUser?.data?.wallet);
      } catch (error) {
        console.log('error: ', error);
        let myMessage = error?.response?.data;
        if (error?.response?.data.includes('jwt')) myMessage = constants.USER_SESSION_EXPIRED;
        setMessagesToModal({ title: constants.MODAL_TITLE_ERROR, body: myMessage });
        localStorage.clear();
        setAlertModalShow(true);
      }
    }
    getTheUser();
  }, [getCategoryImageByID, setItems, headers, updateWallet]);

  const toMyAccount = () => {
    navigator('/account');
  }

  const toMyMovements = () => {
    navigator('/movements');
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

  const filterAndCursorStyle = (hover && !isMobileDevice) ? {
    filter: "invert(0.4) sepia(1) hue-rotate(20deg) saturate(100%)",
    cursor: 'pointer'
  } : undefined;

  const IconBox = () => {
    return (
      <div className={'d-flex align-items-center'} style={filterAndCursorStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="position-relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {!Object.keys(headers).length ?
        <div className='d-flex'>
          <IconBox />
          {letters &&
            <div className='d-flex flex-column align-items-start ms-2'>
              <span className='noDisplay'>Inicia sesión</span>
              <span className='noDisplay'>a tu cuenta</span>
            </div>
          }
        </div>
        :
        <div className='d-flex'>
          {fixedMobile
            ? <>
              <div className='d-flex flex-column align-items-center ms-2' style={filterAndCursorStyle}>
                <IconBox />
                <span>{currencyValue(getWallet())}</span>
              </div>
            </>
            : <>
              <IconBox />
              <div className='d-flex flex-column align-items-start ms-2' style={filterAndCursorStyle}>
                <span>{userName}</span>
                <span>{currencyValue(getWallet())}</span>
              </div>
            </>
          }
          <div className={`position-absolute top-100 ${!hover && 'visually-hidden'} ${!isMobileDevice && 'dropStyle'}`}>
            <div className='divOption' onClick={toMyAccount}>Mi cuenta</div>
            <div className='divOption' onClick={toMyMovements}>Pedidos</div>
            <div className='divOption' onClick={signOut}>Cerrar sesión</div>
          </div>
        </div>
      }
      <AlertModal
        show={alertModalShow}
        onHide={() => onCloseModal()}
        title={messagesToModal.title}
        bodyText={messagesToModal.body}
      />
    </div>
  );
};

export { UserNav };