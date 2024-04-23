import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const Signin = lazy(() => import("../pages/Signin/Signin"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const Account = lazy(() => import("../pages/Account/Account"));
const Shop = lazy(() => import("../pages/Shop/Shop"));
const Category = lazy(() => import("../pages/Category/Category"));

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/account', component: Account },
    { path: '/shop', component: Shop},
    { path: '/category/:category_id', component: Category },
];
  
export default routes;