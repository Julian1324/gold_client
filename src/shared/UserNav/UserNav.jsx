import React, { useState } from 'react';

const UserNav = ({ userName }) => {
  const [hover, setHover] = useState(false);

  const IconBox = () => {
    return (
      <div className='d-flex align-items-center' style={{ filter: `${hover ? 'invert(0.4) sepia(1) hue-rotate(20deg) saturate(100%)' : ''}` }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
      </div>
    );
  }

  const signOut = (e) => {
    console.log(e);
  }

  return (
    <div className="position-relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className='d-flex' style={{ cursor: 'pointer' }}>
        {userName ?
          <div className='d-flex flex-row'>
            <IconBox />
            <div
              className='d-flex flex-column align-items-start ms-2'
              style={{ filter: `${hover ? 'invert(0.4) sepia(1) hue-rotate(20deg) saturate(100%)' : ''}` }}
            >
              <span>{userName}</span>
              <span>{'Mi cuenta'}</span>
            </div>
            <ul className={
              `${hover ? 'd-flex flex-column position-absolute top-100 bg-dark z-1' : 'd-none'}`
            }>
              <li>Action</li>
              <li>Another action</li>
              <li>Something else here</li>
            </ul>
          </div>
          :
          <div className='d-flex flex-row'>
            <IconBox />
            <div className='d-flex flex-column align-items-start ms-2'>
              <span>{'Inicia sesión'}</span>
              <span>{'a tu cuenta'}</span>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export { UserNav };