import { useEffect, useState } from "react";
import CardProduct from "../../components/Cards/CardProduct";
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from "../../helpers/axiosHelper";
import { getUserSlice, getCategorySlice } from "../../context/store/store";

const Category = () => {
    const [products, setProducts] = useState([]);
    const { category_id } = useParams();
    const { headers } = getUserSlice();
    const { currentCategoryPage, getCategoryImageByID } = getCategorySlice();

    useEffect(() => {
        const getProducts = async () => {
            const response = await getProductsByCategory({ category_id, currentCategoryPage });
            // console.log(response.data.docs.map((product) => ({ ...product, ...getCategoryImageByID(category_id) })));
            setProducts(response.data.docs.map((product) => ({ ...product, ...getCategoryImageByID(category_id) })));
        }
        getProducts();
    }, [category_id, headers, currentCategoryPage, getCategoryImageByID]);
    return (
        <div className="d-flex p-5 flex-wrap justify-content-center">
            {products.map((product, productIndex) => {
                return (
                    <CardProduct
                        _id={product._id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        key={productIndex}
                        body={product.description}
                        discount={product.discount}
                        quantity={product.quantity}
                        status={product.status}
                    />
                )
            })}
            {!products.length && <div style={{height: '50vh'}}>Por el momento no hay nada en esta categoría...</div>}
        </div>
    )
}

export default Category;