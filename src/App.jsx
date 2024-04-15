import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import MyNavbar from "./shared/Navbar/MyNavbar.jsx";
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, indexRoute) => {
          return (
            <Route
              path={route.path}
              element={
                <Suspense fallback={<span>Loading...</span>}>
                  {
                    route.path.includes('sign') ?
                      <route.component />
                      :
                      <><MyNavbar /><route.component /></>
                  }
                </Suspense>
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