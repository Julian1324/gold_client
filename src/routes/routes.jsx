import Home from "../pages/Home/Home";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
];
  
export default routes;