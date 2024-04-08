import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import MyNavbar from "./shared/Navbar/MyNavbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, indexRoute) => {
          return (
            <Route
              path={route.path}
              element={
                route.path.includes('sign') ?
                  <route.component/>
                  :
                  <><MyNavbar/><route.component/></>
              }
              key={indexRoute}>
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;