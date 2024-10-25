import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState, useRef } from 'react';
import { getCategorySlice, getUserSlice } from "../../context/store/store";
import { getAllProducts } from "../../helpers/axiosHelper";
import CardProduct from "../../components/Cards/CardProduct";
import "./AutoScrollSplide.css";

const AutoScrollSplide = () => {

    const [bestSellers, setBestSellers] = useState([]);
    const { getCategoryImageByID } = getCategorySlice();
    const { getFindedProducts } = getUserSlice();
    const findedProducts = getFindedProducts();
    const splideRef = useRef(null);

    const autoScrollOptions = {
        type: 'loop',
        gap: '10px',
        drag: false,
        arrows: false,
        pagination: false,
        perPage: 4,
        autoStart: false,
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
        const getBestSellers = async () => {

            const mappedProducts = (product) => ({ ...product, ...getCategoryImageByID(product.category_id) });
            if (findedProducts.length) {
                setBestSellers(findedProducts.map(mappedProducts));
            } else {
                const response = await getAllProducts({ page: 1 });
                setBestSellers(response.data.docs.map(mappedProducts));
                delete response.data.docs;
            }
        }
        getBestSellers();

        const splideInstance = splideRef.current.splide;

        if (splideInstance) {

            // const splideChildren = splideInstance.Components.Elements.list.children;
            // console.log('splideInstance.Components', splideInstance.Components);
            
            const splideChildNodes = splideInstance.Components.Elements.list.childNodes;

            // splideChildNodes.forEach((slide) => {
            //     console.log('slide', slide);
                
            //     slide.addEventListener('click', () => {
            //         console.log('Slide clicked:', slide);
            //     });
            // });

            splideInstance.on('mounted', () => {
                console.log('mounted');
                splideChildNodes.forEach((slide) => {
                    
                    slide.addEventListener('click', () => {
                        console.log('Slide clicked:', slide);
                    });
                });
            });

            return () => {
                splideChildNodes.forEach((slide) => {
                    slide.removeEventListener('click', () => {
                        console.log('Slide clicked:', slide);
                    });
                });
            };
        }

    }, [getCategoryImageByID, findedProducts]);

    return (
        <div className='d-flex flex-column mt-5 w-100'>
            <h1 className='d-flex justify-content-center mb-5'>Los más vendidos</h1>
            <Splide options={autoScrollOptions} ref={splideRef}>
                {bestSellers.map((bestSeller, bsIndex) => {
                    return (
                        <SplideSlide key={bsIndex}>
                            <CardProduct
                                _id={bestSeller._id}
                                name={bestSeller.name}
                                image={bestSeller.image}
                                price={bestSeller.price}
                                key={bsIndex}
                                body={bestSeller.description}
                                discount={bestSeller.discount}
                                quantity={bestSeller.quantity}
                                status={bestSeller.status}
                            />
                        </SplideSlide>
                    );
                })}
            </Splide>
        </div>
    );
}

export default AutoScrollSplide