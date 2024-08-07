import React, { useEffect, useState } from "react";

interface BannerProps {
  scrollToMovieListRef: () => void;
}

const Bannerr: React.FC<BannerProps> = (props) => {
  return (
    <div className="w-full">
      <div className="flex flex-col-reverse items-center sm:flex-row">
        <div className="relative z-10 px-10 text-center md:px-0 md:ml-16 md:-mr-16 md:text-left basis-2/5 xl:basis-1/3">
          <h1 className="text-3xl font-bold md:text-4xl">
            Xem phim miễn phí chất lượng cao
          </h1>
          <span className="block mt-6 mb-6 font-medium text-color-second">
            Hàng ngàn phim chất lượng cao hoàn toàn miễn phí và đặc biệt là
            không quảng cáo
          </span>
          <button
            onClick={() => props.scrollToMovieListRef()}
            className="px-6 py-2 font-medium text-white transition duration-300 ease-out delay-75 rounded-full bg-color-main hover:scale-95 hover:bg-color-main-hover "
          >
            Xem ngay
          </button>
        </div>
        <div className="relative basis-2/3 ">
          {/* <video
            autoPlay
            muted
            loop
            className="w-full h-[37vw]"
            src="https://website-static.plex.tv/videos/home_hero_background_2023.mp4"
          ></video> */}
          <img
              className="w-full object-cover h-[37vw]"
              src="https://phimimg.com/upload/vod/20240728-1/72533f0717174f7bde6450550e98b405.jpg"
              alt="Banner image"
            />
          <div className="absolute inset-0 w-full bg-gradient-to-r from-black via-transparent to-black"></div>
          <div className="absolute inset-0 w-full bg-gradient-to-t from-black via-transparent to-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Bannerr;
