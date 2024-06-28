import React, { useEffect, useState } from 'react';
import { getUserSlice, getCartSlice, getCategorySlice } from '../../context/store/store';
import { AlertModal } from '../../shared/Modal/AlertModal';
import { constants } from '../../context/constants';
import { useNavigate } from 'react-router-dom';
import { currencyValue } from '../../helpers/currencyHelper';
import { getUser } from '../../helpers/axiosHelper';

const UserNav = () => {
  const navigator = useNavigate();
  const [hover, setHover] = useState(false);
  const { userName, headers, updateUserName, updateHeaders, getWallet, updateWallet } = getUserSlice();
  const { setItems } = getCartSlice();
  const { getCategoryImageByID } = getCategorySlice();
  const [alertModalShow, setAlertModalShow] = useState(false);
  const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });

  useEffect(() => {
    const getTheUser = async () => {
      if (!Object.keys(headers).length) return;
      const theUser = await getUser({ headers });
      console.log('theUser', theUser);
      if (theUser?.data?.cart.length) {
        setItems(theUser?.data?.cart);
      }
      updateWallet(theUser?.data?.wallet);
    }
    getTheUser();
  }, []);

  const toMyAccount = () => {
    navigator('/account');
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

  const filterAndCursorStyle = hover ? {
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
          <div className='d-flex flex-column align-items-start ms-2'>
            <span>Inicia sesión</span>
            <span>a tu cuenta</span>
          </div>
        </div>
        :
        <div className='d-flex'>
          <IconBox />
          <div className='d-flex flex-column align-items-start ms-2' style={filterAndCursorStyle}>
            <span>{userName}</span>
            <span>{currencyValue(getWallet())}</span>
          </div>
          <div className={`position-absolute top-100 ${!hover && 'visually-hidden'} dropStyle`}>
            <div className='divOption' onClick={toMyAccount}>Mi cuenta</div>
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