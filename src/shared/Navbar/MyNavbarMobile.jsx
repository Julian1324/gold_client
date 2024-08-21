import { useState } from "react";

const MyNavbarMobile = () => {
    const [toggleNav, setToggleNav] = useState(true);

    return (
        <>
            {toggleNav &&
                <div className="d-flex position-absolute top-0 start-0">
                    <div
                        className='bg-light position-relative'
                        style={{ height: '100dvh', width: '70dvw', zIndex: 7 }}
                    >
                        asd
                    </div>
                    <div
                        className="position-relative"
                        onClick={() => setToggleNav(false)}
                        style={{ height: '100dvh', width: '30dvw', zIndex: 7, backgroundColor: 'rgba(0, 0, 0, 0.800)' }}
                    >
                    </div>
                </div>
            }
        </>
    )
}

export default MyNavbarMobile;