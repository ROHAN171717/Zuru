import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainContent from "./components/mainContent/MainContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./components/movie/Movie";

function App() {
  return (
      <div className="App">
        <Header />
      <Routes>
        <Route path="/" element={ <MainContent/>} />
        <Route exact path="/movie/:id" element={ <Movie/>} />
        <Route path="*" element={ <MainContent/>} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
