import { useEffect, useState } from "react";
import { getAllProducts } from "../../helpers/axiosHelper";
import CardProduct from "../../components/Cards/CardProduct";
import { getCategorySlice } from "../../context/store/store";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const { getCategoryImageByID } = getCategorySlice();

    useEffect(() => {
        const getProducts = async () => {
            const response = await getAllProducts({ page: 1 });
            setProducts(response.data.docs.map((product) => ({ ...product, ...getCategoryImageByID(product.category_id) })));
        }
        getProducts();
    }, [getCategoryImageByID]);

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

export default Shop;