import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import goldServiceLogo from '../../assets/servicioGold2.webp';
import './MyNavbar.css';
import { getCategorySlice, getUserSlice, getCartSlice } from '../../context/store/store';
import { UserNav } from '../UserNav/UserNav';
import { getCategories, queryProducts } from '../../helpers/axiosHelper';
import { currencyValue } from '../../helpers/currencyHelper';
import CartModal from '../Modal/CartModal';
import NewProductModal from '../Modal/NewProductModal';
import { navCategories } from './navBarCategories';
import { AlertModal } from '../Modal/AlertModal';
import { constants } from '../../context/constants';
import FixedNavbarMobile from './FixedNavbarMobile';

const MyNavbar = () => {
  const navigator = useNavigate();
  const myNavbarRef = useRef(null);
  const contResponsiveRef = useRef(null);
  const { headers, setFindedProducts, setMobileDevice, getMobileDevice } = getUserSlice();
  const { categories, updateCategories } = getCategorySlice();
  const { items, getSubtotal } = getCartSlice();
  const [hover, setHover] = useState();
  const inputRef = useRef(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loadingQuery, setLoadingQuery] = useState(false);
  const location = useLocation();
  const [alertModalShow, setAlertModalShow] = useState(false);
  const [messagesToModal, setMessagesToModal] = useState({ title: '', body: '' });
  const isMobileDevice = getMobileDevice();
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  const myCategories = useMemo(() => {
    return [...navCategories];
  }, []);

  useEffect(() => {
    const getMyCategories = async () => {
      setFindedProducts([]);
      inputRef.current.value = '';

      if (window.innerWidth < constants.WIDTH_MOBILE) setMobileDevice(true);

      const response = await getCategories();
      const categoriesMap = myCategories.reduce((acc, category) => {
        acc[category.name] = category.image;
        return acc;
      }, {});
      const updatedCategories = response.data.map((category) => { return { ...category, image: categoriesMap[category.name] } });
      updateCategories(updatedCategories);
    }
    getMyCategories();
  }, [updateCategories, myCategories, setFindedProducts, setMobileDevice]);

  const onCategory = (event, categoryName) => {
    event.preventDefault();
    if (categoryName === 'Inicio') return navigator('/');
    if (categoryName === 'Tienda') return navigator('/shop');
    const categoryFinded = categories.find((currentCategory) => currentCategory.name === categoryName);
    if (!categoryFinded) return;
    navigator('/category/' + categoryFinded._id);
  }

  const onStopTyping = async () => {
    setLoadingQuery(true);
    const query = inputRef.current.value;
    const response = await queryProducts({ query });
    setLoadingQuery(response.loadingReq);
    if (!response.data.length) {
      setAlertModalShow(true);
      setMessagesToModal({ title: 'Resultado de busqueda', body: `No se encontraron productos "${query}".` });
    }
    setFindedProducts(response.data);
  }

  const onSearch = (event) => {

    if (!location.pathname.includes('/shop') && !location.pathname.includes('/category')) navigator('/shop');

    if (event.type === 'click') {
      onStopTyping();
    } else {
      if (!event.target.value) {
        setFindedProducts([]);
        return clearTimeout(typingTimeout);
      }

      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      setTypingTimeout(
        setTimeout(() => {
          onStopTyping();
        }, 1000)
      );
    }
  }

  window.onscroll = function () {
    if (isMobileDevice) setScrollPosition(window.scrollY);
  }

  return (
    <>
      <Navbar
        expand="lg"
        className={`d-flex navbarSticky background-color-dark flex-column ${isMobileDevice && 'position-fixed w-100 z-3'}`}
      >
        <div className={`contResponsive d-flex w-100 ${(isMobileDevice && (scrollPosition > 150)) && 'resize'}`} ref={contResponsiveRef}>
          {(scrollPosition < 150) &&
            <Navbar.Brand href="/" className={`d-flex text-light cont ${isMobileDevice ? 'w-100 justify-content-center mx-3' : 'justify-content-center'}`}>
              <Image src={goldServiceLogo} rounded className='goldServiceLogo' />
            </Navbar.Brand>
          }
          <InputGroup
            className={
              `d-flex align-items-center ${isMobileDevice ? 'inputResponsive' : 'w-50'}`
            }
          >
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Categorías
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {myCategories.map((category, categoryIndex) => {
                  if (categoryIndex > 1)
                    return (
                      <Dropdown.Item
                        key={categoryIndex}
                        onClick={(event) => onCategory(event, category.name)}
                        href=".">{category.name}
                      </Dropdown.Item>
                    )
                  else return '';
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              placeholder="Buscar"
              aria-label="Buscar"
              aria-describedby="basic-addon2"
              onChange={onSearch}
              ref={inputRef}
            />
            <Button variant="light" onClick={onSearch} disabled={loadingQuery}>
              {loadingQuery
                ? <svg className='spinner-border spinner-border-sm'></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              }

            </Button>
          </InputGroup>
          <div
            className={
              `d-flex align-items-center text-light ${isMobileDevice ? 'w-100 justify-content-center mt-4 mb-4' : 'w-25 justify-content-around'}`
            }
          >
            {!Object.keys(headers).length ?
              <NavLink to='/signin' className='d-flex onHover'
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'white'
                }}
              >
                {!isMobileDevice && <UserNav letters={true} fixedMobile={false} />}
              </NavLink>
              :
              !isMobileDevice && <UserNav fixedMobile={false} />
            }
            <NavLink
              to='/cart'
              className='d-flex navCart'
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {!isMobileDevice
                && <>
                  <div className='d-flex align-items-center ms-3'>
                    {!!items.length &&
                      <span className="position-relative top-0 start-100 translate-middle badge rounded-pill text-bg-danger">
                        {items.length}
                      </span>
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                    </svg>
                  </div>
                  <div className='d-flex flex-column justify-content-center w-100 ms-3'>
                    <span className='noDisplay'>Su cesta</span>
                    <span>{currencyValue(getSubtotal())}</span>
                  </div>
                </>
              }
            </NavLink>
            <CartModal
              show={!!items.length}
              items={items}
              hover={hover}
              setHover={setHover}
              subtotal={currencyValue(getSubtotal())}
            />
            <NewProductModal />
          </div>
        </div>
        {!isMobileDevice &&
          <div className='navContainer d-flex background-color-dark' ref={myNavbarRef} >
            <hr />
            {myCategories.map((category, categoryIndex) => {
              if (!category.icon) return null;
              const imageStyle = {
                width: '2.5rem',
                height: '2.5rem',
                backgroundImage: `url(${category.icon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
              return (
                <div className='divContainer noCategories' key={categoryIndex} onClick={(event) => onCategory(event, category.name)}>
                  <div style={imageStyle}></div>
                  <div className='nameStyle'>{category.name}</div>
                </div>
              );
            })}
          </div>
        }

      </Navbar>
      {isMobileDevice && <FixedNavbarMobile />}
      <AlertModal
        show={alertModalShow}
        onHide={() => setAlertModalShow(false)}
        title={messagesToModal.title}
        bodyText={messagesToModal.body}
        size='md'
        closeButton={0}
      />
    </>
  );
}

export default MyNavbar;