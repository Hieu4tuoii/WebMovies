import React from "react";
import "./App.css";
import Navbarr from "./components/custom/Navbarr";
import Footer from "./components/custom/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import MovieGenrePage from "./Pages/MovieCategoryPage/MovieCategoryPage";
import MovieDetailPage from "./Pages/MovieDetailPage/MovieDetailPage";
import ScrollToTop from "./components/custom/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div className="relative text-white bg-black">
      <BrowserRouter>
        <Navbarr />
        {/* tu dong cuon len dau trang moi khi chuyen trang */}
        <ScrollToTop/>
        <SpeedInsights/>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage/>
            }
          />
          {/* chi tiet phim va ds tap phim */}
           <Route
            path=":slug"
            element={
              <MovieDetailPage/>
            }
          />

          {/* ds phim theo laoi phim(phim moi, hoat hinh ...) */}
          <Route
            path="/:categoryOrCountry/:slug"
            element={
             <MovieGenrePage />
            }
          />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
