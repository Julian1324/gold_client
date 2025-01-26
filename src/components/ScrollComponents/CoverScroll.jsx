import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { getUserSlice } from '../../context/store/store';

const CoverScroll = () => {

    const { getMobileDevice } = getUserSlice();
    const isMobileDevice = getMobileDevice();

    const splideOptions = {
        type: 'loop',
        lazyLoad: 'sequential',
        perPage: 1,
        focus: 'center',
        gap: '1rem',
        pagination: false,
        autoplay: true,
        arrows: false,
        interval: 3000
    };

    const coverImages = () => {
        const images = [];
        let imagesBoolean = true;
        let imageCont = 0;
        while (imagesBoolean) {
            try {
                imageCont++;
                images.push(require(`../../assets/CoverImages/${imageCont}.webp`));
            } catch (error) {
                return images;
            }
        }
    }

    return (
        <Splide aria-label="Cover" options={splideOptions} style={{ marginTop: isMobileDevice ? '10rem' : '0', height: '80vh' }}>
            {coverImages().map((image, imageIndex) => {
                return (
                    <SplideSlide className="w-100" key={imageIndex}>
                        <img data-splide-lazy={image} alt="Cover 1" className="w-100 coverImage" />
                    </SplideSlide>
                )
            })}
        </Splide>
    );
}

export default CoverScroll;