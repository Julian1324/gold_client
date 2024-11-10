import CardCategory from "../Cards/CardCategory";
import { getCategorySlice } from "../../context/store/store";

const MainCategories = () => {

    const { getCategories } = getCategorySlice();
    const categoriesIDS = [...getCategories()];

    const categoryImages = () => {
        const images = [];
        let imagesBoolean = true;
        let imageCont = 0;
        while (imagesBoolean) {
            try {
                imageCont++;
                images.push(require(`../../assets/mainCategories/${imageCont}.webp`));
            } catch (error) {
                return images;
            }
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Principales categorías</h1>
            <div className="d-flex flex-wrap justify-content-evenly w-100 mt-5">
                {categoryImages().map((category, cIndex) => {
                    return (
                        <CardCategory image={category} categoryID={categoriesIDS[cIndex]?._id} key={cIndex} />
                    )
                })}
            </div>
        </div>
    )
}

export default MainCategories;