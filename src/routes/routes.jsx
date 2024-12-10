import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const Signin = lazy(() => import("../pages/Signin/Signin"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const Account = lazy(() => import("../pages/Account/Account"));
const Shop = lazy(() => import("../pages/Shop/Shop"));
const Category = lazy(() => import("../pages/Category/Category"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Purchase = lazy(() => import("../pages/Purchase/Purchase"));
const PurchaseSummary = lazy(() => import("../pages/PurchaseSummary/Summary"));
const Movements = lazy(() => import('../pages/Movements/Movements'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/account', component: Account },
    { path: '/shop', component: Shop},
    { path: '/category/:category_id', component: Category },
    { path: '/cart', component: Cart },
    { path: '/purchase', component: Purchase },
    { path: '/purchaseSummary', component: PurchaseSummary },
    { path: '/movements', component: Movements },
    { path: '*', component: NotFound },
];
  
export default routes;