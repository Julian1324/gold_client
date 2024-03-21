import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, indexRoute) => {
          return (<Route path={route.path} Component={route.component} key={indexRoute}></Route>);
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
