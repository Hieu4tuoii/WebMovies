import React, { useRef } from "react";
import Bannerr from "./Bannerr";
import Question from "src/components/custom/Question";
import MoviesByCategory from "./MoviesByCategory";

const HomePage: React.FC = () => {
  // Thêm useRef để tham chiếu đến  vi tri ds phim
  const MovieListRef = useRef<HTMLDivElement>(null);

  //scroll xuong vi tri duoc danh dau
  const scrollToMovieListRef = () => {
    MovieListRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Bannerr scrollToMovieListRef={scrollToMovieListRef} />
      <div
        //danh dau vi tri ds phim
        ref={MovieListRef}
        className="px-4 pt-10 pb-1 mx-auto mt-10 sm:px-12 sm:pt-14 sm:pb-2 bg-bg-section2"
      >
        <MoviesByCategory
          CategoryName="Phim mới cập nhật"
          endpoint="/danh-sach/phim-moi-cap-nhat"
        />
        <MoviesByCategory
          CategoryName="Danh sách phim lẻ"
          endpoint="/danh-sach/phim-le"
        />
        <MoviesByCategory
          CategoryName="Danh sách phim bộ"
          endpoint="/danh-sach/phim-bo"
        />
        <MoviesByCategory
          CategoryName="Danh sách hoạt hình"
          endpoint="/danh-sach/hoat-hinh"
        />
        <MoviesByCategory
          CategoryName="Danh sách TV Show"
          endpoint="/danh-sach/tv-shows"
        />
      </div>
      <Question />
    </div>
  );
};

export default HomePage;
