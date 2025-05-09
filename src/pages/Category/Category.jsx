import { useEffect, useState } from "react";
import CardProduct from "../../components/Cards/CardProduct";
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from "../../helpers/axiosHelper";
import { getCategorySlice, getUserSlice } from "../../context/store/store";
import InfiniteScroll from "react-infinite-scroll-component";
import '../Category/Category.css';

const Category = () => {
    const [products, setProducts] = useState([]);
    const { category_id } = useParams();
    const [paginator, setPaginator] = useState({});
    const { getCategoryImageByID } = getCategorySlice();
    const { getFindedProducts } = getUserSlice();
    const findedProducts = getFindedProducts();

    useEffect(() => {
        const getProducts = async () => {
            const mappedProducts = (product) => ({ ...product, ...getCategoryImageByID(product.category_id) });
            if (findedProducts.length) {
                setProducts(findedProducts.map(mappedProducts));
            } else {
                try {
                    const response = await getProductsByCategory({ category_id, page: 1 });
                    setProducts(response.data.docs.map(mappedProducts));
                    delete response.data.docs;
                    setPaginator(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        getProducts();
    }, [category_id, getCategoryImageByID, findedProducts]);

    const onScrollProducts = async (nextPage) => {
        const response = await getProductsByCategory({ category_id, page: nextPage });
        const newProducts = response.data.docs.map((product) => ({ ...product, ...getCategoryImageByID(product.category_id) }));
        setProducts([...products, ...newProducts]);
        delete response.data.docs;
        setPaginator(response.data);
    }

    return (
        <InfiniteScroll
            dataLength={products.length}
            next={() => onScrollProducts(paginator.nextPage)}
            hasMore={paginator.hasNextPage}
            loader={<div>Loading......................................</div>}
            className="d-flex p-5 flex-wrap justify-content-center align-items-end infinityResponsive"
        >
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
        </InfiniteScroll>
    )
}

export default Category;