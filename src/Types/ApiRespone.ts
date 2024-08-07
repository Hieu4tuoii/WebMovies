import { MovieDetail } from "../Services/MovieDetailServices";
import { Server_Data } from "./Episode";
import {ItemsMovie } from "./Items";


//apiv1 dc bọc bởi data nên phải tạo thêm
export interface MovieApiRespone {
    data: ItemsMovie;
  }

  export interface MovieDetailApiRespone {
    
    episodes: Server_Data;
    movie: MovieDetail;
  }

 