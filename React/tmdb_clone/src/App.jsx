import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Filter from './pages/filter/Filter';
import DetailedContent from './pages/detailedContent/DetailedContent';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:category/:id" element={<DetailedContent />} />
        <Route path="/:category/:subCategory" element={<Filter />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
