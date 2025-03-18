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
                {categoryImages().map((categoryImg, cIndex) => {
                    
                    // This is a temporary solution to get the category ID
                    const categoriesIndexImg = {
                        1: categoriesIDS.find(category => category.name === "Disney+")?._id || 'asd123asd',
                        2: categoriesIDS.find(category => category.name === "Netflix")?._id || 'asd123asd',
                        3: categoriesIDS.find(category => category.name === "Prime Video")?._id || 'asd123asd',
                        4: categoriesIDS.find(category => category.name === "Star+")?._id || 'asd123asd',
                        5: categoriesIDS.find(category => category.name === "Plex")?._id || 'asd123asd',
                        6: categoriesIDS.find(category => category.name === "HBOMAX")?._id || 'asd123asd',
                    };
                    
                    return (
                        <CardCategory image={categoryImg} categoryID={categoriesIndexImg[cIndex + 1]} key={cIndex} />
                    )
                })}
            </div>
        </div>
    )
}

export default MainCategories;