import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import coverImage from '../../assets/coverImage.jpeg';

const CoverScroll = () => {
    const splideOptions = {
        type: 'loop',
        lazyLoad: 'nearby',
        perPage: 1,
        focus: 'center',
        gap: '1rem',
        pagination: false,
        autoplay: true,
        arrows: false,
        interval: 3000
    };

    return (
        <Splide aria-label="Cover" options={splideOptions} className="heightSplide">
            <SplideSlide className="w-100 heightSplide">
                <img src={coverImage} alt="Cover 1" className="w-100 imagen" />
            </SplideSlide>
            <SplideSlide className="w-100 heightSplide">
                <img src={coverImage} alt="Cover 2" className="w-100 imagen" />
            </SplideSlide>
        </Splide>
    );
}

export default CoverScroll;