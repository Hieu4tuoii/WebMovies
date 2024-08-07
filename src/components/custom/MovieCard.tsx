import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movieName: string;
  origin_name: string;
  imgSrc: string;
  slug: string;
}

const MovieCard: React.FC<MovieCardProps> = (props) => {
  return (
    <div className="h-full">
    <Link to={`/${props.slug}`} className="relative block h-full group">
      <div className="overflow-hidden rounded-lg group-hover:border-white border-2 border-[#0000] h-3/4 sm:h-4/5"> 
      <img
          loading="lazy"
          className="object-cover w-full h-full transition-all duration-500 rounded-lg group-hover:transform group-hover:transition-all group-hover:scale-105 group-hover:duration-500"
          src={props.imgSrc}
          alt={props.movieName}
        />
      </div>
      <div className="mt-1">
        <h3 className="overflow-hidden text-lg font-normal whitespace-nowrap text-ellipsis">
          {props.movieName}
        </h3>
        <span className="text-color-three space-nowrap text-ellipsis">{props.origin_name}</span>
      </div>
    </Link>
    </div>
  );
};

export default MovieCard;
