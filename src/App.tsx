import React from "react";
import "./App.css";
import Navbarr from "./components/custom/Navbarr";
import Footer from "./components/custom/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import MovieGenrePage from "./Pages/MovieCategoryPage/MovieCategoryPage";
import MovieDetailPage from "./Pages/MovieDetailPage/MovieDetailPage";
import ScrollToTop from "./components/custom/ScrollToTop";

function App() {
  return (
    <div className="relative text-white bg-black">
      <BrowserRouter>
        <Navbarr />
        {/* tu dong cuon len dau trang moi khi chuyen trang */}
        <ScrollToTop/>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage/>
            }
          />
          {/*láy ds all phim theo thể loại*/}
          <Route
            path="/danh-sach/phim-moi-cap-nhat"
            element={
             <MovieGenrePage movieGenreName="Danh sach phim mới" endpoint="/phim-moi-cap-nhat" />
            }
          />
          <Route
            path="/danh-sach/phim-le"
            element={
             <MovieGenrePage movieGenreName="Danh sach phim lẻ" endpoint="/phim-le?limit=20" />
            }
          />
          <Route
            path="/danh-sach/phim-bo"
            element={
             <MovieGenrePage movieGenreName="Danh sach phim bộ" endpoint="/phim-bo?limit=20" />
            }
          />
          <Route
            path="/danh-sach/hoat-hinh"
            element={
             <MovieGenrePage movieGenreName="Danh sach phim hoạt hình" endpoint="/hoat-hinh?limit=20" />
            }
          />
          <Route
            path="/danh-sach/tv-shows"
            element={
             <MovieGenrePage movieGenreName="Danh sach TV Shows" endpoint="/tv-shows?limit=20" />
            }
          />
           <Route
            path=":slug"
            element={
              <MovieDetailPage/>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
