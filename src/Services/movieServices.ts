import { api, apiV1 } from "./customAxios";
import { Movie } from "../Types/Movie";
import { MovieApiRespone } from "../Types/ApiRespone";
import { ItemsMovie } from "../Types/Items";



// Hàm lấy danh sách movie theo thể loại
export const getMoviesByCategory = async (endpoint: string): Promise<Movie[]> => {
  try {
    // Vì danh sách phim nằm trong items nên phải get items về trước (items thuộc interface ApiResponse)
    const response = await apiV1.get<MovieApiRespone>(endpoint);
    const movies= response.data.data.items;
    return movies.map((movie) => ({
      _id: movie._id,
      origin_name: movie.origin_name,
      name: movie.name,
      poster_url: `https://phimimg.com/${movie.poster_url}`,
      slug: movie.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch movies", error);
    throw error;
  }
};

//lấy danh sách phim mới
export const getNewMovies = async (endpoint: string): Promise<Movie[]> => {
  try {
    //vì ds phim nằm trong items nên phải get items về trước(items thuộc interface ApiRespone)
    const response = await api.get<ItemsMovie>(endpoint);
      const movies = response.data.items;
      return movies;
  } catch (error) {
    console.error("Failed tofetch movies", error);
    throw error;
  }
};



