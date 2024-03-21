// import arrow from "../assets/downArrow.png";
import React, { useState } from 'react';

const UserNav = ({ name }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const signOut = (e) => {
    console.log(e);
  }

  return (
    <div className="relative">

      <div className={`absolute -left-3 z-10 ${hover ? 'flex' : 'hidden'} w-screen max-w-max -translate-x-1/2 px-4`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className=" flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <div>
                <div className="font-semibold text-red-600" onClick={(e)=>signOut(e)}>
                  Log out
                  <span className="absolute inset-0"></span>
                </div>
                <p className="mt-1 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserNav };