import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from 'react';
import routes from "./routes/routes";
import MyNavbar from "./shared/Navbar/MyNavbar.jsx";
import Footer from './shared/Footer/Footer.jsx';
import { getUserSlice } from "./context/store/store";

function App() {
  const { updateHeaders, updateUserName } = getUserSlice();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token) updateHeaders(token);
    if (name) updateUserName(name);
  }, [updateHeaders, updateUserName]);

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
                      <> <MyNavbar /><route.component /><Footer /> </>
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
