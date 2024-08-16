// rafce

import { getMoviesByCategory } from "src/Services/movieServices";
import { Movie } from "src/Types/Movie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface MovieSearchListProps {
  keyword: string;
}

const MovieSearchList: React.FC<MovieSearchListProps> = (props) => {
  const [movieSearchList, setMovieSearchList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //lay ra ds phim theo keyword nhan vao
  const searchMovies = async () => {
    try {
      setLoading(true);
      let moviesData;
      moviesData = await getMoviesByCategory(
        //đổi kí tự khoảng trắng thành %20
        `/tim-kiem?keyword=${props.keyword
          .trim()
          .replaceAll(" ", "%20")}&limit=10`
      );
      if (moviesData && moviesData.length != 0) {
        setMovieSearchList(moviesData);
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to fetch movies");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.keyword.trim() != "") {
      searchMovies();
    }
    if (props.keyword.trim() == "") {
      setMovieSearchList([]);
    }
  }, [props.keyword]);

  //ẩn khi ko nhập gì vaof ô tìm kiem
  if (loading)
    return (
      <div className="w-full py-16">
        <div className="mx-auto loader"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  //nếu trong ds có phim thì mới lấy ra tránh lỗi
  return (
    <div className="w-full">
      {movieSearchList.length != 0 ? (
        <ul>
          {movieSearchList.map((movie) => (
            <li key={movie._id} className="block w-full">
              <Link to={movie.slug}>
                <div className="flex flex-row items-center hover:bg-gray-700">
                  <div className="h-16 py-1 pl-5 pr-3 w-18">
                    <img
                      className="object-cover rounded-sm shadow-md size-full"
                      src={movie.poster_url}
                      alt={movie.name}
                    />
                  </div>
                  <div className="w-[80%] text-left overflow-hidden">
                    <span className="block whitespace-nowrap text-ellipsis">
                      {movie.name}
                    </span>
                    <span className="block text-sm whitespace-nowrap text-ellipsis text-color-second">
                      {movie.origin_name}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieSearchList;
