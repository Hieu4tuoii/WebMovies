import { MovieDetailApiRespone } from "../Types/ApiRespone";
import { api } from "./customAxios";

export interface MovieDetail {
  created: {
    time: string;
  };
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
}

export interface Episode {
  server_name: string;
  server_data: ServerData[];
}

export interface ServerData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface ApiDetailResponse {
  status: boolean;
  msg: string;
  movie: MovieDetail;
  episodes: Episode[];
}

export const getMovieDetail = async (
  slug: string
): Promise<ApiDetailResponse> => {
  try {
    //vì ds phim nằm trong items nên phải get items về trước(items thuộc interface ApiRespone)
    const response = await api.get<ApiDetailResponse>(`/phim/${slug}`);
    const movies = response.data;
    return movies;
  } catch (error) {
    console.error("Failed tofetch movies", error);
    throw error;
  }
};
