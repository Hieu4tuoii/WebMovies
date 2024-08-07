import React from "react";
import { Skeleton } from "../ui/skeleton";

export const SkeletonMovieCard = () => {
  return (
    <div className="flex flex-col space-y-4 xl:h-[25vw] lg:h-[30vw] sm:h-[38vw] h-[52vw] ">
      <Skeleton className="h-[85%] rounded-xl" />
      <div className="space-y-2 h-[15%]">
        <Skeleton className="h-[50%]" />
        <Skeleton className="h-[30%]" />
      </div>
    </div>
  );
};

export const SKeletonMoviesCarousel = () => {
  return(
  <div className="mb-8 sm:mb-10">
    <Skeleton className="h-8 w-72" />
    <div className="flex flex-row gap-3">
      <div className="mt-4 basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
        <SkeletonMovieCard />
      </div>
      <div className="mt-4 basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
        <SkeletonMovieCard />
      </div>
      <div className="mt-4 basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
        <SkeletonMovieCard />
      </div>
      <div className="hidden mt-4 sm:block basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
        <SkeletonMovieCard />
      </div>
      <div className="hidden mt-4 lg:block basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
        <SkeletonMovieCard />
      </div>
      <div className="hidden mt-4 xl:block basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6">
        <SkeletonMovieCard />
      </div>
    </div>
  </div>
  )
};

export const SkeletonMovieLisByCategory = () => {
  const skeletonArrays = Array.from({ length: 10 }); //tao mang co 25 phan tu underfine
  return (
    <div className="w-3/4 mx-auto">
      <Skeleton className="h-6 mx-auto mt-10 mb-6 w-60 sm:h-8" />
      <ul className="">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {skeletonArrays.map(
            (
              _,
              index //su dung _ vi ko can quan tam den gia tri cuaa bien ma chi can lap 10 lan
            ) => (
              <li className="block h-full">
                <SkeletonMovieCard />
              </li>
            )
          )}
        </div>
      </ul>
    </div>
  );
};
