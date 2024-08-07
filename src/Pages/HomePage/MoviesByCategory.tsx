import React, { useEffect, useState } from "react";
import MovieCard from "../../components/custom/MovieCard";
import {
  getMoviesByCategory,
  getNewMovies,
} from "../../Services/movieServices";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "src/components/ui/carousel";
import { Link } from "react-router-dom";
import { Movie } from "src/Types/Movie";
import { Skeleton } from "src/components/ui/skeleton";
import { SkeletonMovieCard, SKeletonMoviesCarousel } from "src/components/custom/SkeletonLoading";

interface MoviesByCategoryProps {
  CategoryName: string;
  endpoint: string;
}

const MoviesByCategory: React.FC<MoviesByCategoryProps> = (props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //ham lay ds movie tu MovieServices
  const fetchMovies = async () => {
    let moviesData;
    try {
      if (props.endpoint == "/danh-sach/phim-moi-cap-nhat") {
        moviesData = await getNewMovies(`${props.endpoint}`);
      } else {
        moviesData = await getMoviesByCategory(`${props.endpoint}`);
      }
      if (moviesData && moviesData.length != 0) {
        setMovies(moviesData);
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

  if (loading)
    return (
      <SKeletonMoviesCarousel/>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="mb-8 sm:mb-10">
      <Link to={`${props.endpoint}`}>
        <h2 className="ml-4 text-xl font-semibold sm:text-2xl ">
          {props.CategoryName}
          <i className="ml-2 text-xl fa-solid fa-chevron-right"></i>
        </h2>
      </Link>
      <ul
        className="mt-4 relative after:-left-2 after:top-0 after:absolute after:z-10 after:h-full after:w-20 after:content-[''] after:bg-gradient-to-l after:from-[#1f1f1f00] after:to-[#1F1F1F] 
                      before:-right-2 before:top-0 before:absolute before:z-10 before:h-full before:w-20 before:content-[''] before:bg-gradient-to-r before:from-[#1f1f1f00] before:to-[#1F1F1F]"
      >
        <Carousel className="">
          <CarouselContent className="">
            {movies.map((movie) => (
              <CarouselItem className=" basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                <li key={movie._id} className="block h-full">
                  <MovieCard
                    imgSrc={movie.poster_url}
                    origin_name={movie.origin_name}
                    movieName={movie.name}
                    slug={movie.slug}
                  />
                </li>
              </CarouselItem>
            ))}
            <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <Link to={`${props.endpoint}`} className="block h-full">
                <div className="relative h-full group">
                  <div className="hover:p-0.5 hover:border-2  max-h-[80%] h-full rounded-lg">
                    <div className="flex flex-col items-center justify-center overflow-hidden rounded-md h-3/4 sm:h-4/5">
                      <i className="text-5xl fa-solid fa-grip-vertical"></i>
                      <span className="mt-2 text-2xl">View all</span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-0 z-20 border-0 top-[40%] bg-[#4220] text-white" />
          <CarouselNext className="right-0 z-20 border-0 top-[40%] bg-[#4220] text-white" />
        </Carousel>
      </ul>
    </div>
  );
};

export default MoviesByCategory;
