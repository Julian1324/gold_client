import Home from "../pages/Home/Home";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import Account from "../pages/Account/Account";
import Category from "../pages/Category/Category";

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/account', component: Account },
    { path: '/category', component: Category },
];
  
export default routes;