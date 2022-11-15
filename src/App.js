import "./App.css";
import { Home, Favourites } from "./pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setData, setFilteredData } from "./slices/data";
import { data } from "./constants/data";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setData(data));
    dispatch(setFilteredData(data));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
