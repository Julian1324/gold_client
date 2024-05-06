import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import goldServiceLogo from '../../assets/goldServiceLogo.png';
import './MyNavbar.css';
import storeIcon from '../../assets/store.png';
import homeIcon from '../../assets/home.png';
import netflixIcon from '../../assets/netflix.png';
import amazonIcon from '../../assets/amazon.png';
import disneyIcon from '../../assets/disney.png';
import starIcon from '../../assets/star.png';
import playIcon from '../../assets/play.png';
import crunchyrollIcon from '../../assets/crunchyroll.png';
import IPTVIcon from '../../assets/iptv.png';
import netflixCategoryPH from '../../assets/netflixCategoryPH.png';
import amazonCategoryPH from '../../assets/amazonCategoryPH.png';
import { getCategorySlice, getUserSlice, getCartSlice } from '../../context/store/store';
import { UserNav } from '../UserNav/UserNav';
import { getCategories } from '../../helpers/axiosHelper';
import { currencyValue } from '../../helpers/currencyHelper';
import CartModal from '../Modal/CartModal';
import NewProductModal from '../Modal/NewProductModal';

const MyNavbar = () => {
  const navigator = useNavigate();
  const myNavbarRef = useRef(null);
  const { headers } = getUserSlice();
  const { categories, updateCategories } = getCategorySlice();
  const { items, getSubtotal } = getCartSlice();
  const [hover, setHover] = useState();

  const myCategories = useMemo(() => {
    return [
      {
        name: 'Inicio',
        icon: homeIcon,
        image: ''
      },
      {
        name: 'Tienda',
        icon: storeIcon,
        image: ''
      },
      {
        name: 'Netflix',
        icon: netflixIcon,
        image: netflixCategoryPH
      },
      {
        name: 'Amazon',
        icon: amazonIcon,
        image: amazonCategoryPH
      },
      {
        name: 'Disney+',
        icon: disneyIcon,
        image: ''
      },
      {
        name: 'Star+',
        icon: starIcon,
        image: ''
      },
      {
        name: 'HBOMAX',
        icon: starIcon,
        image: ''
      },
      {
        name: 'Plex',
        icon: playIcon,
        image: ''
      },
      {
        name: 'Crunchyroll',
        icon: crunchyrollIcon,
        image: ''
      },
      {
        name: 'Vix',
        icon: playIcon,
        image: ''
      },
      {
        name: 'IPTV',
        icon: IPTVIcon,
        image: ''
      },
    ];
  }, []);

  useEffect(() => {
    const getMyCategories = async () => {
      const response = await getCategories();
      const categoriesMap = myCategories.reduce((acc, category) => {
        acc[category.name] = category.image;
        return acc;
      }, {});
      const updatedCategories = response.data.map((category) => { return { ...category, image: categoriesMap[category.name] } });
      updateCategories(updatedCategories);
    }
    getMyCategories();
  }, [updateCategories, myCategories]);

  const onCategory = (categoryName) => {
    if (categoryName === 'Inicio') return navigator('/');
    if (categoryName === 'Tienda') return navigator('/shop');
    const categoryFinded = categories.find((currentCategory) => currentCategory.name === categoryName);
    if (!categoryFinded) return;
    navigator('/category/' + categoryFinded._id);
  }

  window.onscroll = function () {
    if (!myNavbarRef.current) return;
    const currentScrollPos = window.scrollY;
    const navContainer = myNavbarRef.current;
    if (currentScrollPos > 110) {
      navContainer.style.position = "fixed";
      navContainer.style.zIndex = "9";
      navContainer.style.top = "0";
      navContainer.style.maxWidth = "100vw";
    } else {
      navContainer.style.display = 'flex';
      navContainer.style.position = "inherit";
      navContainer.style.flexWrap = 'wrap';
      navContainer.style.justifyContent = 'center';
      navContainer.style.zIndex = 0;
    }
  };

  return (
    <>
      <Navbar expand="lg" className="d-flex background-color-dark flex-column">
        <Container>
          <Navbar.Brand href="/" className='d-flex text-light cont'>
            <Image src={goldServiceLogo} rounded className='goldServiceLogo' />
          </Navbar.Brand>
          <InputGroup className="d-flex align-items-center w-50">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Categorías
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="./action-1">Action</Dropdown.Item>
                <Dropdown.Item href="./action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="./action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              placeholder="Busca por categorías"
              aria-label="Busca por categorías"
              aria-describedby="basic-addon2"
            />
            <Button variant="secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </Button>
          </InputGroup>
          <div className='d-flex text-light w-25 justify-content-around'>
            {!Object.keys(headers).length ?
              <NavLink to='/signin' className='d-flex onHover' style={{ cursor: 'pointer' }}>
                <UserNav />
              </NavLink>
              :
              <UserNav />
            }
            <NavLink to='/cart' className='d-flex' style={{ cursor: 'pointer' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              <div className='d-flex align-items-center ms-3'>
                {!!items.length &&
                  <span className="position-relative top-0 start-100 translate-middle badge rounded-pill text-bg-primary">
                    {items.length}
                  </span>
                }
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
              </div>
              <div className='d-flex flex-column justify-content-center w-100 ms-3'>
                <span>Su cesta</span>
                <span>{currencyValue(getSubtotal())}</span>
              </div>
            </NavLink>
            <CartModal
              show={!!items.length}
              items={items}
              hover={hover}
              setHover={setHover}
              subtotal={currencyValue(getSubtotal())}
            />
            <NewProductModal/>
          </div>
        </Container>
        <hr />
        <Container className='navContainer background-color-dark' ref={myNavbarRef} >
          {myCategories.map((category, categoryIndex) => {
            const imageStyle = {
              width: '2.5rem',
              height: '2.5rem',
              backgroundImage: `url(${category.icon})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
            return (
              <div className='divContainer' key={categoryIndex} onClick={() => onCategory(category.name)}>
                <div style={imageStyle}></div>
                <div className='nameStyle'>{category.name}</div>
              </div>
            );
          })}
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;