import React, { useEffect, useState } from "react";
import {
  getMoviesByCategory,
  getNewMovies,
} from "../../Services/movieServices";
import MovieCard from "src/components/custom/MovieCard";
import { Movie } from "@/src/Types/Movie";
import { Divide } from "lucide-react";
import { SkeletonMovieLisByCategory } from "src/components/custom/SkeletonLoading";

interface MovieGenrePageProps {
  movieGenreName: string;
  endpoint: string;
}

const MovieGenrePage: React.FC<MovieGenrePageProps> = (props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //ham lay ds movie tu MovieServices
  const fetchMovies = async () => {
    let moviesData: Movie[] = [];
    try {
      if (props.endpoint == "/phim-moi-cap-nhat") {
        moviesData = await getNewMovies(`/danh-sach${props.endpoint}`);
      } else {
        moviesData = await getMoviesByCategory(`/danh-sach${props.endpoint}`);
      }
      if (moviesData && moviesData.length != 0 && movies.length == 0) {
        //neeus ko xay ra loi thi moi set ds phim
        setMovies(moviesData); 
        setLoading(false);
      } else if (moviesData && moviesData.length != 0 && movies.length > 0) {
        //nếu đã có phần tử trong mảng movies mà lại goiji tiếp get phim từ api từ thực hiện thêm vào mảng movies các data mới
        setMovies((prevMovies) => [...prevMovies, ...moviesData]); //premovies chứa giá trị callback từ movie, sau đó tạo bản sao từ promovies, tiếp theo add dữ liệu moviesData vừa get đc
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to fetch movies");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return (
    <div>
      <SkeletonMovieLisByCategory/>
    </div>
  )
  if (error) return <p>{error}</p>;

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="mt-10 mb-6 text-2xl font-semibold text-center sm:text-3xl">{props.movieGenreName}</h2>
      <ul className="">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
              <li className="block h-full">
                <MovieCard
                  imgSrc={movie.poster_url}
                  origin_name={movie.origin_name}
                  movieName={movie.name}
                  slug={movie.slug}
                />
              </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default MovieGenrePage;
