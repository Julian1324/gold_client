import { useEffect, useState } from "react";
import CardProduct from "../../components/Cards/CardProduct";

const Category = () => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        const myProductsQuemados = [
            { name: 'Nesflis'},
            { name: 'Nesflis'},
            { name: 'Nesflis'},
            { name: 'Nesflis'},
        ];
        setProducts(myProductsQuemados);
    },[]);
    return (
        <div className="d-flex vh-100">
            {products.map((product) => {
                return (
                    <CardProduct name={product.name}/>
                )
            })}
        </div>
    )
}

export default Category;