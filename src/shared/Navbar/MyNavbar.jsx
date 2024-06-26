import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import goldServiceLogo from '../../assets/goldServiceLogo.png';
import './MyNavbar.css';
import storeImage from '../../assets/store.png';
import homeImage from '../../assets/home.png';
import netflixImage from '../../assets/netflix.png';
import amazonImage from '../../assets/amazon.png';
import disneyImage from '../../assets/disney.png';
import starImage from '../../assets/star.png';
import playImage from '../../assets/play.png';
import crunchyrollImage from '../../assets/crunchyroll.png';
import IPTVImage from '../../assets/IPTV.png';
import { getUserSlice } from '../../context/store/store';
import { UserNav } from '../UserNav/UserNav';

const MyNavbar = () => {
  const myNavbarRef = useRef(null);
  const { userName, token } = getUserSlice();

  const services = [
    {
      name: 'Inicio',
      pathImage: homeImage
    },
    {
      name: 'Tienda',
      pathImage: storeImage
    },
    {
      name: 'Netflix',
      pathImage: netflixImage
    },
    {
      name: 'Amazon',
      pathImage: amazonImage
    },
    {
      name: 'Disney+',
      pathImage: disneyImage
    },
    {
      name: 'Star+',
      pathImage: starImage
    },
    {
      name: 'HBOMAX',
      pathImage: starImage
    },
    {
      name: 'Plex',
      pathImage: playImage
    },
    {
      name: 'Crunchyroll',
      pathImage: crunchyrollImage
    },
    {
      name: 'Vix',
      pathImage: playImage
    },
    {
      name: 'IPTV',
      pathImage: IPTVImage
    },
  ];

  window.onscroll = function () {
    if (!myNavbarRef.current) return;
    const currentScrollPos = window.scrollY;
    const navContainer = myNavbarRef.current;
    if (currentScrollPos > 110) {
      navContainer.style.position = "fixed";
      navContainer.style.zIndex = "99";
      navContainer.style.top = "0";
      navContainer.style.maxWidth = "100vw";
    } else {
      navContainer.style.display = 'flex';
      navContainer.style.position = "inherit";
      navContainer.style.flexWrap = 'wrap';
      navContainer.style.justifyContent = 'center';
    }
  };

  return (
    <>
      <Navbar expand="lg" className="d-flex bg-color-black flex-column">
        <Container>
          <Navbar.Brand href="#home" className='d-flex text-light cont'>
            <Image src={goldServiceLogo} rounded className='goldServiceLogo' />
          </Navbar.Brand>
          <InputGroup className="d-flex align-items-center w-50">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Categorías
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
          <div className='d-flex text-light ms-3 w-25 justify-content-around'>
            {!token ?
              <NavLink to='./signin' className='d-flex onHover' style={{ cursor: 'pointer' }}>
                <UserNav userName={userName}/>
              </NavLink>
              :
              <UserNav userName={userName}/>
            }
            <NavLink to='./cart' className='d-flex onHover' style={{ cursor: 'pointer' }}>
              <div className='d-flex align-items-center ms-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
              </div>
              <div className='d-flex flex-column justify-content-center w-100 ms-3'>
                <span>Su cesta</span>
                <span>$0</span>
              </div>
            </NavLink>
          </div>
        </Container>
        <hr />
        <Container className='navContainer bg-color-black' ref={myNavbarRef} >
          {services.map((service, serviceIndex) => {
            const imageStyle = {
              width: '2.5rem',
              height: '2.5rem',
              backgroundImage: `url(${service.pathImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
            return (
              <div className='divContainer' key={serviceIndex}>
                <div style={imageStyle}></div>
                <div className='nameStyle'>{service.name}</div>
              </div>
            );
          })}
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;