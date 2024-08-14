import React, { useEffect, useState } from "react";
import {
  getMoviesByCategory,
  getNewMovies,
} from "../../Services/movieServices";
import MovieCard from "src/components/custom/MovieCard";
import { Movie } from "@/src/Types/Movie";
import { Divide } from "lucide-react";
import { SkeletonMovieLisByCategory } from "src/components/custom/SkeletonLoading";
import { useParams } from "react-router-dom";



const MovieGenrePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams();
  const {categoryOrCountry} = useParams();

  //ham lay ds movie tu MovieServices
  const fetchMovies = async () => {
    let moviesData: Movie[] = [];
    setLoading(true);
    try {
      if (slug == "phim-moi-cap-nhat") {
        moviesData = await getNewMovies(`/${categoryOrCountry}/${slug}`);
      } else {
        moviesData = await getMoviesByCategory(`/${categoryOrCountry}/${slug}?limit=20`);
      }
        //neeus ko xay ra loi thi moi set ds phim
        setMovies(moviesData); 
        setLoading(false);
       
    } catch (error) {
      setError("Failed to fetch movies");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [categoryOrCountry, slug]);

  if (loading) return (
    <div>
      <SkeletonMovieLisByCategory/>
    </div>
  )
  if (error) return <p>{error}</p>;

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="mt-10 mb-6 text-2xl font-semibold text-center sm:text-3xl">Danh sách phim</h2>
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
