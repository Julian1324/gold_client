import './Home.css';
import AutoScrollSplide from '../../components/ScrollComponents/AutoScrollSplide';
import CoverScroll from '../../components/ScrollComponents/CoverScroll';
import MainCategories from '../../components/MainCategories/MainCategories';

function Home() {
    return (
        <>
            <div className="d-flex">
                <CoverScroll />
            </div>
            <div className="d-flex justify-content-center">
                <AutoScrollSplide />
            </div>
            <div className="mt-5">
                <MainCategories />
            </div>
        </>
    );
}

export default Home;