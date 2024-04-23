import { useEffect, useState } from "react";
import { getUserSlice } from "../../context/store/store";
import { getAllProducts } from "../../helpers/axiosHelper";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const { headers } = getUserSlice();

    useEffect(() => {
        const getProducts = async () => {
            const response = await getAllProducts({ page: 1 });
            console.log(response);
        }
        getProducts();
    }, []);

    return (
        <>
            <div className="vh-100">
                Shop component works!
            </div>
        </>
    )
}

export default Shop;