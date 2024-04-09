import { useEffect, useState } from "react";
import CardProduct from "../../components/Cards/CardProduct";
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from "../../helpers/axiosHelper";
import { getUserSlice } from "../../context/store/store";

const Category = () => {
    const [products, setProducts] = useState([]);
    const { category_id } = useParams();
    const { headers } = getUserSlice();

    useEffect(() => {
        const getProducts = async () => {

            const response = await getProductsByCategory({category_id});
            console.log(response);
            // setProducts(response.data);
        }
        getProducts();
        const myProductsQuemados = [
            { name: 'Nesflis', image: 'https://placehold.co/250', price: 5000 },
            { name: 'Nesflis', image: 'https://placehold.co/250', price: 5000 },
            { name: 'Nesflis', image: 'https://placehold.co/250', price: 5000 },
            { name: 'Nesflis', image: 'https://placehold.co/250', price: 5000 },
        ];
        setProducts(myProductsQuemados);
    }, [category_id, headers]);
    return (
        <div className="d-flex p-5">
            {products.map((product, productIndex) => {
                return (
                    <CardProduct
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        key={productIndex}
                    />
                )
            })}
        </div>
    )
}

export default Category;