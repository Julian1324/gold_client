import { useEffect, useState } from "react";
import CardProduct from "../../components/Cards/CardProduct";

const Category = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const myProductsQuemados = [
            { name: 'Nesflis', image: 'https://placehold.co/250', price: 5000 },
            { name: 'Nesflis', image: 'https://placehold.co/250', price: 5000 },
            { name: 'Nesflis', image: 'https://placehold.co/250', price: 5000 },
            { name: 'Nesflis', image: 'https://placehold.co/250', price: 5000 },
        ];
        setProducts(myProductsQuemados);
    }, []);
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