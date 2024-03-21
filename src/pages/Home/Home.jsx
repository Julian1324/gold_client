import MyNavbar from "../../shared/Navbar/MyNavbar";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import coverImage from '../../assets/coverImage.jpeg';
import './Home.css';
import { useEffect } from "react";
// import { useUserStore } from "../../context/store/store.js";

function Home() {
    // const { userName, token } = useUserStore();
    const splideOptions = {
        type: 'loop',
        perPage: 1,
        focus: 'center',
        gap: '1rem',
        pagination: false,
        autoplay: true,
        arrows: false,
        interval: 3000
    };

    useEffect(() => {
        // if (!token) return;
        // console.log(userName);
    });

    return (
        <>
            <MyNavbar />
            <div className="d-flex">
                <Splide aria-label="Cover" options={splideOptions} className="heightSplide">
                    <SplideSlide className="w-100 heightSplide">
                        <img src={coverImage} alt="Cover 1" className="w-100 imagen" />
                    </SplideSlide>
                    <SplideSlide className="w-100 heightSplide">
                        <img src={coverImage} alt="Cover 2" className="w-100 imagen" />
                    </SplideSlide>
                </Splide>
            </div>
            <div className="vh-100">
                Other div
            </div>
        </>
    );
}

export default Home;