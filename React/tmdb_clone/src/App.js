import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainContent from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Filter from "./pages/filter/Filter";
import DetailedContent from "./pages/detailedContent/DetailedContent";
import TrailerModel from "./pages/detailedContent/components/trailerModel/TrailerModel";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          exact
          path="/detail/:category/:id"
          element={<DetailedContent />}
        />
        <Route exact path="/:category/:subCategory" element={<Filter />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <Routes>
        <Route exact path="/trailer/:category/:id" element={<TrailerModel />} />
      </Routes>
    </div>
  );
}

export default App;
