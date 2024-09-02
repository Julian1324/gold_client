import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import CardBestSeller from '../Cards/CardBestSeller';
import { useEffect, useState } from 'react';

const AutoScrollSplide = () => {

    const [bestSellers, setBestSellers] = useState([]);

    const autoScrollOptions = {
        type: 'loop',
        gap: '10px',
        drag: 'free',
        arrows: false,
        pagination: false,
        perPage: 4,
        autoStart: true,
        autoScroll: {
            pauseOnHover: false,
            pauseOnFocus: false,
            rewind: false,
            speed: 1,
        },
        breakpoints: {
            1024: {
                perPage: 3,
            },
            768: {
                perPage: 2,
            },
            500: {
                perPage: 1
            }
        },
        lazyLoad: 'nearby'
    }

    useEffect(() => {
        const myArregloQuemado = [
            { image: "https://via.placeholder.com/150", title: 'Nesflis', body: 'Pantalla de 30 días', price: '5000' },
            { image: "https://via.placeholder.com/150", title: 'Nesflis', body: 'Pantalla de 30 días', price: '5000' },
            { image: "https://via.placeholder.com/150", title: 'Nesflis', body: 'Pantalla de 30 días', price: '5000' },
            { image: "https://via.placeholder.com/150", title: 'Nesflis', body: 'Pantalla de 30 días', price: '5000' },
            { image: "https://via.placeholder.com/150", title: 'Nesflis', body: 'Pantalla de 30 días', price: '5000' },
            { image: "https://via.placeholder.com/150", title: 'Nesflis', body: 'Pantalla de 30 días', price: '5000' },
            { image: "https://via.placeholder.com/150", title: 'Nesflis', body: 'Pantalla de 30 días', price: '5000' },
            { image: "https://via.placeholder.com/150", title: 'Nesflis', body: 'Pantalla de 30 días', price: '5000' },
        ];
        setBestSellers(myArregloQuemado);
    }, []);

    return (
        <div className='d-flex flex-column mt-5 w-100'>
            <h1 className='d-flex justify-content-center mb-5'>Los más vendidos</h1>
            <Splide extensions={{ AutoScroll }} options={autoScrollOptions}>
                {bestSellers.map((bestSeller, bsIndex) => {
                    return (
                        <SplideSlide key={bsIndex}>
                            <CardBestSeller
                                image={bestSeller.image}
                                title={bestSeller.title}
                                body={bestSeller.body}
                                price={bestSeller.price}
                            />
                        </SplideSlide>
                    );
                })}
            </Splide>
        </div>
    );
}

export default AutoScrollSplide