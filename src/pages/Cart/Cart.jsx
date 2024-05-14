import { getCartSlice } from '../../context/store/store';
import { getUserSlice } from '../../context/store/store';
import CartItem from '../../components/CartItems/CartItem';
import { useEffect, useState } from 'react';
import { getCartItems } from '../../helpers/axiosHelper';
import { getCategorySlice } from "../../context/store/store";

const Cart = () => {
    const { items } = getCartSlice();
    const { headers } = getUserSlice();
    const { getCategoryImageByID } = getCategorySlice();
    const [myItems, setMyItems] = useState([]);

    useEffect(() => {
        const getMyCartItems = async () => {
            const response = await getCartItems({ items });
            const unifiedArray = response.data.map(item => {
                const matchingItem = items.find(i => i._id === item._id);
                if (matchingItem) return { ...item, ...matchingItem }
                return item;
            });
            setMyItems([...unifiedArray]);
        }
        getMyCartItems();
    }, [items, getCategoryImageByID]);

    const CartComponent = () => {
        return (
            <div className="d-flex justify-content-center vh-100 bg-secondary-subtle">
                <div className="d-flex flex-column" style={{ width: '55vw' }}>
                    <h3 className='mt-4'>
                        Carro de compras
                    </h3>
                    {myItems.map((item, itemIndex) =>
                        <CartItem
                            _id={item._id}
                            name={item.name}
                            image={item.image}
                            currentQuantity={item.quantity}
                            price={item.price}
                            discount={item.discount}
                            quantityToBuy={item.quantityToBuy}
                            key={itemIndex}
                        />
                    )}
                </div>
                <div className='d-flex flex-column' style={{ width: '20vw' }}>
                    <h3 className='mt-4'>
                        Resumen de la orden
                    </h3>
                    <div className='bg-light rounded v-100'>
                        asd
                    </div>
                </div>
            </div>
        )
    }

    const CarritoSVG = () => {
        return (
            <div style={{ width: '10vw', height: '10vw' }}>
                <svg viewBox="0 0 108 108" focusable="false"><path d="M86 54C86 71.6731 71.6731 86 54 86C36.3269 86 22 71.6731 22 54C22 36.3269 36.3269 22 54 22C71.6731 22 86 36.3269 86 54Z" fill="#E9EDF1"></path><path fillRule="evenodd" clipRule="evenodd" d="M54 22.75C36.7411 22.75 22.75 36.7411 22.75 54C22.75 71.2589 36.7411 85.25 54 85.25C71.2589 85.25 85.25 71.2589 85.25 54C85.25 36.7411 71.2589 22.75 54 22.75ZM21.25 54C21.25 35.9127 35.9127 21.25 54 21.25C72.0873 21.25 86.75 35.9127 86.75 54C86.75 72.0873 72.0873 86.75 54 86.75C35.9127 86.75 21.25 72.0873 21.25 54Z" fill="#A9B5C0"></path><path d="M49.5 84C49.5 86.7614 47.2614 89 44.5 89C41.7386 89 39.5 86.7614 39.5 84C39.5 81.2386 41.7386 79 44.5 79C47.2614 79 49.5 81.2386 49.5 84Z" fill="#CAD1D9"></path><path fillRule="evenodd" clipRule="evenodd" d="M44.5 87.5C46.433 87.5 48 85.933 48 84C48 82.067 46.433 80.5 44.5 80.5C42.567 80.5 41 82.067 41 84C41 85.933 42.567 87.5 44.5 87.5ZM44.5 89C47.2614 89 49.5 86.7614 49.5 84C49.5 81.2386 47.2614 79 44.5 79C41.7386 79 39.5 81.2386 39.5 84C39.5 86.7614 41.7386 89 44.5 89Z" fill="#758595"></path><path d="M84.5 84C84.5 86.7614 82.2614 89 79.5 89C76.7386 89 74.5 86.7614 74.5 84C74.5 81.2386 76.7386 79 79.5 79C82.2614 79 84.5 81.2386 84.5 84Z" fill="#CAD1D9"></path><path fillRule="evenodd" clipRule="evenodd" d="M79.5 87.5C81.433 87.5 83 85.933 83 84C83 82.067 81.433 80.5 79.5 80.5C77.567 80.5 76 82.067 76 84C76 85.933 77.567 87.5 79.5 87.5ZM79.5 89C82.2614 89 84.5 86.7614 84.5 84C84.5 81.2386 82.2614 79 79.5 79C76.7386 79 74.5 81.2386 74.5 84C74.5 86.7614 76.7386 89 79.5 89Z" fill="#758595"></path><path d="M28.5 30L38.32 84H34.3231L24.5 30H28.5Z" fill="#E9EDF1"></path><path fillRule="evenodd" clipRule="evenodd" d="M35.5748 82.5H36.5226L27.2482 31.5H26.2975L35.5748 82.5ZM34.3231 84H38.32L28.5 30H24.5L34.3231 84Z" fill="#758595"></path><path d="M22.0543 33C21.7095 33 21.3891 32.8224 21.2063 32.53L19.9563 30.53C19.5401 29.864 20.0189 29 20.8043 29H35.8261C36.3091 29 36.7231 29.3453 36.8098 29.8205L37.3901 33L38.1171 37L46.5358 83.3212C46.6474 83.935 46.1758 84.5 45.552 84.5H43.5847C43.1014 84.5 42.6872 84.1544 42.6008 83.6789L33.5357 33.8211C33.4493 33.3456 33.0352 33 32.5519 33H22.0543Z" fill="#E9EDF1"></path><path fillRule="evenodd" clipRule="evenodd" d="M22.3315 31.5H32.5519C33.7601 31.5 34.7954 32.3641 35.0115 33.5528L44.002 83H44.9529L35.9143 33.2682L35.4091 30.5H21.7065L22.3315 31.5ZM36.8098 29.8205C36.7231 29.3453 36.3091 29 35.8261 29H20.8043C20.0189 29 19.5401 29.864 19.9563 30.53L21.2063 32.53C21.3891 32.8224 21.7095 33 22.0543 33H32.5519C33.0352 33 33.4493 33.3456 33.5357 33.8211L42.6008 83.6789C42.6872 84.1544 43.1014 84.5 43.5847 84.5H45.552C46.1758 84.5 46.6474 83.935 46.5358 83.3212L36.8098 29.8205Z" fill="#758595"></path><path d="M38.5 84C38.5 82.8954 39.3954 82 40.5 82H79.5C80.6046 82 81.5 82.8954 81.5 84C81.5 85.1046 80.6046 86 79.5 86H40.5C39.3954 86 38.5 85.1046 38.5 84Z" fill="#E9EDF1"></path><path fillRule="evenodd" clipRule="evenodd" d="M79.5 83.5H40.5C40.2239 83.5 40 83.7239 40 84C40 84.2761 40.2239 84.5 40.5 84.5H79.5C79.7761 84.5 80 84.2761 80 84C80 83.7239 79.7761 83.5 79.5 83.5ZM40.5 82C39.3954 82 38.5 82.8954 38.5 84C38.5 85.1046 39.3954 86 40.5 86H79.5C80.6046 86 81.5 85.1046 81.5 84C81.5 82.8954 80.6046 82 79.5 82H40.5Z" fill="#758595"></path><path d="M26.5 40H87.1162C88.3598 40 89.3018 41.1229 89.0857 42.3476L84.0832 70.6951C83.7459 72.6066 82.085 74 80.1441 74H35.8559C33.915 74 32.2541 72.6066 31.9168 70.6951L26.5 40Z" fill="#CAD1D9"></path><path fillRule="evenodd" clipRule="evenodd" d="M26.5 40L31.9168 70.6951C32.2541 72.6066 33.915 74 35.8559 74H80.1441C82.085 74 83.7459 72.6066 84.0832 70.6951L89.0857 42.3476C89.3018 41.1229 88.3598 40 87.1162 40H26.5ZM28.2879 41.5L33.394 70.4345C33.6048 71.6291 34.6428 72.5 35.8559 72.5H80.1441C81.3572 72.5 82.3952 71.6291 82.606 70.4345L87.6085 42.0869C87.6626 41.7807 87.4271 41.5 87.1162 41.5H28.2879Z" fill="#758595"></path><path d="M26.5 40H76.6162C77.8598 40 78.8018 41.1229 78.5857 42.3476L73.5832 70.6951C73.2459 72.6066 71.585 74 69.6441 74H35.8559C33.915 74 32.2541 72.6066 31.9168 70.6951L26.5 40Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M26.5 40L31.9168 70.6951C32.2541 72.6066 33.915 74 35.8559 74H69.6441C71.585 74 73.2459 72.6066 73.5832 70.6951L78.5857 42.3476C78.8018 41.1229 77.8598 40 76.6162 40H26.5ZM28.2879 41.5L33.394 70.4345C33.6048 71.6291 34.6428 72.5 35.8559 72.5H69.6441C70.8572 72.5 71.8952 71.6291 72.106 70.4345L77.1085 42.0869C77.1626 41.7807 76.9271 41.5 76.6162 41.5H28.2879Z" fill="#758595"></path><path fillRule="evenodd" clipRule="evenodd" d="M24.75 89.75C24.75 89.3358 25.0858 89 25.5 89H83.5C83.9142 89 84.25 89.3358 84.25 89.75C84.25 90.1642 83.9142 90.5 83.5 90.5H25.5C25.0858 90.5 24.75 90.1642 24.75 89.75Z" fill="#758595"></path><path fillRule="evenodd" clipRule="evenodd" d="M39.8814 68.9884C39.4736 69.0609 39.0842 68.7891 39.0117 68.3813L35.0117 45.8813C34.9392 45.4735 35.211 45.0841 35.6189 45.0116C36.0267 44.9391 36.416 45.2109 36.4885 45.6187L40.4885 68.1187C40.561 68.5265 40.2892 68.9159 39.8814 68.9884ZM52.7501 45C53.1643 45 53.5001 45.3358 53.5001 45.75L53.5001 68.25C53.5001 68.6642 53.1643 69 52.7501 69C52.3359 69 52.0001 68.6642 52.0001 68.25L52.0001 45.75C52.0001 45.3358 52.3359 45 52.7501 45ZM62.4955 45.8328C62.5413 45.4211 62.2446 45.0503 61.833 45.0046C61.4213 44.9588 61.0505 45.2555 61.0047 45.6672L58.5047 68.1672C58.459 68.5789 58.7556 68.9497 59.1673 68.9954C59.579 69.0412 59.9498 68.7445 59.9955 68.3328L62.4955 45.8328ZM69.8814 45.0116C70.2892 45.0841 70.5611 45.4735 70.4886 45.8813L66.4886 68.3813C66.416 68.7891 66.0267 69.0609 65.6189 68.9884C65.211 68.9159 64.9392 68.5265 65.0117 68.1187L69.0117 45.6187C69.0842 45.2109 69.4736 44.9391 69.8814 45.0116ZM45.5047 68.3328C45.5505 68.7445 45.9213 69.0412 46.333 68.9954C46.7446 68.9497 47.0413 68.5789 46.9955 68.1672L44.4955 45.6672C44.4498 45.2555 44.079 44.9588 43.6673 45.0046C43.2556 45.0503 42.959 45.4211 43.0047 45.8328L45.5047 68.3328Z" fill="#758595"></path><path d="M41.5 84C41.5 86.7614 39.2614 89 36.5 89C33.7386 89 31.5 86.7614 31.5 84C31.5 81.2386 33.7386 79 36.5 79C39.2614 79 41.5 81.2386 41.5 84Z" fill="#CAD1D9"></path><path fillRule="evenodd" clipRule="evenodd" d="M36.5 87.5C38.433 87.5 40 85.933 40 84C40 82.067 38.433 80.5 36.5 80.5C34.567 80.5 33 82.067 33 84C33 85.933 34.567 87.5 36.5 87.5ZM36.5 89C39.2614 89 41.5 86.7614 41.5 84C41.5 81.2386 39.2614 79 36.5 79C33.7386 79 31.5 81.2386 31.5 84C31.5 86.7614 33.7386 89 36.5 89Z" fill="#758595"></path><path d="M76.5 84C76.5 86.7614 74.2614 89 71.5 89C68.7386 89 66.5 86.7614 66.5 84C66.5 81.2386 68.7386 79 71.5 79C74.2614 79 76.5 81.2386 76.5 84Z" fill="#CAD1D9"></path><path fillRule="evenodd" clipRule="evenodd" d="M71.5 87.5C73.433 87.5 75 85.933 75 84C75 82.067 73.433 80.5 71.5 80.5C69.567 80.5 68 82.067 68 84C68 85.933 69.567 87.5 71.5 87.5ZM71.5 89C74.2614 89 76.5 86.7614 76.5 84C76.5 81.2386 74.2614 79 71.5 79C68.7386 79 66.5 81.2386 66.5 84C66.5 86.7614 68.7386 89 71.5 89Z" fill="#758595"></path><path d="M39.5 84C39.5 85.6569 38.1569 87 36.5 87C34.8431 87 33.5 85.6569 33.5 84C33.5 82.3431 34.8431 81 36.5 81C38.1569 81 39.5 82.3431 39.5 84Z" fill="#E9EDF1"></path><path fillRule="evenodd" clipRule="evenodd" d="M36.5 85.5C37.3284 85.5 38 84.8284 38 84C38 83.1716 37.3284 82.5 36.5 82.5C35.6716 82.5 35 83.1716 35 84C35 84.8284 35.6716 85.5 36.5 85.5ZM36.5 87C38.1569 87 39.5 85.6569 39.5 84C39.5 82.3431 38.1569 81 36.5 81C34.8431 81 33.5 82.3431 33.5 84C33.5 85.6569 34.8431 87 36.5 87Z" fill="#758595"></path><path d="M74.5 84C74.5 85.6569 73.1569 87 71.5 87C69.8431 87 68.5 85.6569 68.5 84C68.5 82.3431 69.8431 81 71.5 81C73.1569 81 74.5 82.3431 74.5 84Z" fill="#E9EDF1"></path><path fillRule="evenodd" clipRule="evenodd" d="M71.5 85.5C72.3284 85.5 73 84.8284 73 84C73 83.1716 72.3284 82.5 71.5 82.5C70.6716 82.5 70 83.1716 70 84C70 84.8284 70.6716 85.5 71.5 85.5ZM71.5 87C73.1569 87 74.5 85.6569 74.5 84C74.5 82.3431 73.1569 81 71.5 81C69.8431 81 68.5 82.3431 68.5 84C68.5 85.6569 69.8431 87 71.5 87Z" fill="#758595"></path><path fillRule="evenodd" clipRule="evenodd" d="M61.5099 31.0374C61.5099 31.6791 60.9897 32.1992 60.3481 32.1992C59.7064 32.1992 59.1862 31.6791 59.1862 31.0374C59.1862 31.0374 58.6053 22.7071 58.6053 21.7427C58.6053 20.7784 59.3856 20 60.3481 20C61.3105 20 62.0908 20.7784 62.0908 21.7427C62.0908 22.7071 61.5099 31.0374 61.5099 31.0374ZM52.6841 33.7057C53.2398 33.3849 53.4302 32.6743 53.1094 32.1186C53.1094 32.1186 49.4473 24.6139 48.9651 23.7788C48.483 22.9436 47.418 22.6596 46.5845 23.1409C45.7509 23.6221 45.4644 24.6864 45.9466 25.5215C46.4287 26.3566 51.097 33.2804 51.097 33.2804C51.4178 33.8361 52.1284 34.0265 52.6841 33.7057ZM68.012 33.7057C68.5677 34.0266 69.2782 33.8362 69.599 33.2805C69.599 33.2805 74.2673 26.3566 74.7495 25.5215C75.2316 24.6864 74.9451 23.6221 74.1116 23.1409C73.278 22.6596 72.2131 22.9436 71.7309 23.7788C71.2488 24.6139 67.5867 32.1186 67.5867 32.1186C67.2659 32.6743 67.4563 33.3849 68.012 33.7057Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M59.1863 31.0374C59.1863 31.0374 58.6053 22.7071 58.6053 21.7427C58.6053 20.7784 59.3856 20 60.3481 20C61.3106 20 62.0908 20.7784 62.0908 21.7427C62.0908 22.7071 61.5099 31.0374 61.5099 31.0374C61.5099 31.6791 60.9898 32.1992 60.3481 32.1992C59.7064 32.1992 59.1863 31.6791 59.1863 31.0374ZM63.0092 31.0999L63.0313 30.7811C63.0472 30.5511 63.0699 30.2215 63.0972 29.8231C63.1517 29.0263 63.2244 27.9536 63.2971 26.8504C63.4397 24.6884 63.5908 22.2895 63.5908 21.7427C63.5908 19.949 62.138 18.5 60.3481 18.5C58.5582 18.5 57.1053 19.949 57.1053 21.7427C57.1053 22.2895 57.2565 24.6884 57.3991 26.8504C57.4718 27.9536 57.5445 29.0263 57.599 29.8231C57.6262 30.2215 57.649 30.5511 57.6649 30.7811L57.687 31.0999C57.7202 32.5411 58.8989 33.6992 60.3481 33.6992C61.7973 33.6992 62.976 32.5411 63.0092 31.0999ZM51.097 33.2804C51.097 33.2804 46.4288 26.3566 45.9466 25.5215C45.4645 24.6864 45.751 23.6221 46.5845 23.1409C47.4181 22.6596 48.483 22.9436 48.9652 23.7788C49.4473 24.6139 53.1094 32.1186 53.1094 32.1186C53.4302 32.6743 53.2398 33.3849 52.6841 33.7057C52.1284 34.0265 51.4179 33.8361 51.097 33.2804ZM54.439 31.4231L54.2988 31.1359C54.1976 30.9288 54.0525 30.6321 53.8769 30.2734C53.5257 29.5561 53.0523 28.5907 52.5636 27.5989C51.6061 25.6553 50.5376 23.5022 50.2642 23.0288C49.3673 21.4753 47.3846 20.9469 45.8345 21.8418C44.2844 22.7368 43.7507 24.718 44.6476 26.2715C44.921 26.745 46.2513 28.7469 47.4557 30.548C48.0703 31.467 48.6697 32.3597 49.1153 33.0225C49.3381 33.3539 49.5225 33.6279 49.6513 33.8192L49.8299 34.0842C50.5792 35.3157 52.1791 35.7294 53.4341 35.0047C54.6892 34.2801 55.1309 32.6878 54.439 31.4231ZM69.5991 33.2805C69.2783 33.8362 68.5677 34.0266 68.012 33.7057C67.4563 33.3849 67.2659 32.6743 67.5867 32.1186C67.5867 32.1186 71.2488 24.6139 71.731 23.7788C72.2131 22.9436 73.2781 22.6596 74.1116 23.1409C74.9452 23.6221 75.2317 24.6864 74.7495 25.5215C74.2673 26.3566 69.5991 33.2805 69.5991 33.2805ZM66.2571 31.4231L66.3973 31.1359C66.4986 30.9288 66.6437 30.6321 66.8193 30.2734C67.1705 29.5561 67.6439 28.5907 68.1325 27.5989C69.0901 25.6553 70.1586 23.5022 70.4319 23.0288C71.3288 21.4753 73.3115 20.9469 74.8616 21.8418C76.4117 22.7368 76.9454 24.7181 76.0485 26.2715C75.7752 26.745 74.4448 28.7469 73.2404 30.548C72.6258 31.467 72.0265 32.3597 71.5809 33.0225C71.358 33.3539 71.1736 33.6279 71.0448 33.8192L70.8663 34.0842C70.1169 35.3157 68.5171 35.7294 67.262 35.0048C66.0069 34.2802 65.5652 32.6878 66.2571 31.4231Z" fill="#495867"></path></svg>
            </div>
        )
    }

    const NoItemsComponent = () => {
        return (
            <div className="d-flex justify-content-center bg-secondary-subtle" style={{ height: '70vh' }}>
                <div className='d-flex mt-5' style={{ height: '10vw' }}>
                    <CarritoSVG />
                    <div className='d-flex flex-column justify-content-center'>
                        <h5>Tu Carrito está vacío</h5>
                        {!!Object.keys(headers).length
                            ? <>Ve a la tienda a escoger los productos <br /> que deseas comprar.</>
                            : <>Inicia sesión para ver los productos que <br /> habías guardado en tu Carrito.</>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {!!items.length ? <CartComponent /> : <NoItemsComponent />}
        </>
    )
}

export default Cart;