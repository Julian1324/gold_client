import './Home.css';
import AutoScrollSplide from '../../components/ScrollComponents/AutoScrollSplide';
import CoverScroll from '../../components/ScrollComponents/CoverScroll';
import MainCategories from '../../components/MainCategories/MainCategories';
import FloatingIcon from '../../components/FloatingIcon/FloatingIcon';
import { getUserSlice } from '../../context/store/store';

function Home() {
    const { getMobileDevice } = getUserSlice();
    const isMobileDevice = getMobileDevice();

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
            {isMobileDevice ? <FloatingIcon optionalMargin={8}/> : <FloatingIcon />}
        </>
    );
}

export default Home;