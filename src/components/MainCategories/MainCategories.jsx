import { useEffect, useState } from "react";
import CardCategory from "../Cards/CardCategory";

const MainCategories = () => {

    const [mainCategories, setMainCategories] = useState([]);

    useEffect(() => {
        const myCategoriesQuemadas = [
            { image: "https://via.placeholder.com/400" },
            { image: "https://via.placeholder.com/400" },
            { image: "https://via.placeholder.com/400" },
            { image: "https://via.placeholder.com/400" },
            { image: "https://via.placeholder.com/400" },
            { image: "https://via.placeholder.com/400" },
        ];
        setMainCategories(myCategoriesQuemadas);
    }, []);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Principales categorías</h1>
            <div className="d-flex flex-wrap justify-content-evenly w-100 mt-5">
                {mainCategories.map((category, cIndex) => {
                    return (
                        <CardCategory image={category.image} key={cIndex} />
                    )
                })}
            </div>
        </div>
    )
}

export default MainCategories;