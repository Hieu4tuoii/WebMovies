import {
  ApiDetailResponse,
  getMovieDetail,
} from "src/Services/MovieDetailServices";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MoviesByCategory from "../HomePage/MoviesByCategory";
import SameMovieList from "./SameMovieList";
import { Skeleton } from "src/components/ui/skeleton";
import {
  SkeletonMovieCard,
  SkeletonMovieLisByCategory,
  SKeletonMoviesCarousel,
} from "src/components/custom/SkeletonLoading";

const MovieDetailPage: React.FC = () => {
  //xu li click button xem them thong tin ve phim
  const [isshowDesc, setisShowDesc] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<ApiDetailResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //nếu chọn tập phim thì hiển thị video phim thay cho phần mô tả và ảnh của phim
  const [movieUrl, setMovieURL] = useState<string>("");
  const [selectedEpisode, setSetlectedEpisode] = useState<string>("");

  //lay du lieu slug của phim tu params
  const { slug } = useParams<{ slug: string }>();

  // Thêm useRef để tham chiếu đến vi tri cua danh sách tập
  const episodeListRef = useRef<HTMLDivElement>(null);

  const fetchMovieDetail = async () => {
    if (slug) {
      //kiem tra gia tri params truyen vao khong bi underfine
      let movieDetailData: ApiDetailResponse;
      try {
        movieDetailData = await getMovieDetail(slug);
        if (movieDetailData != null && movieDetailData != undefined) {
          setMovieDetail(movieDetailData);
          setLoading(false);
        } else {
          //nêu phim get ra bị underfine
          setError("Phim không tồn tại");
          setLoading(false);
        }
      } catch (error) {
        setError("Có lỗi xảy ra");
        setLoading(false);
      }
    }
  };

  //xu li khi click btn xem them desc
  const handleShowDesc = () => {
    if (isshowDesc) {
      setisShowDesc(false);
    } else {
      setisShowDesc(true);
    }
  };

  //xu li khi chon tap phim thi cap nhat lai tap phim dang chon va cap nhat url video
  const handleChooseEpisode = (nameEpisode: string, urlEpisode: string) => {
    setSetlectedEpisode(nameEpisode);
    setMovieURL(urlEpisode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //khi đổi qua phim khác thì reset lại tập phim đã chọn và url của phim
  const resetPage = () => {
    setisShowDesc(false);
    setMovieDetail(null);
    setLoading(true);
    setError(null);
    setMovieURL("");
    setSetlectedEpisode("");
  };

  // Cuộn xuống vi tri danh sách tập phim
  const scrollToEpisodeList = () => {
    episodeListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    resetPage();
    fetchMovieDetail();
  }, [slug]); //gọi lại fetchmoive moi khi slug thay doi

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex flex-col-reverse sm:items-center sm:flex-row">
          <div className="relative z-10 px-5 space-y-2 sm:px-10 md:px-0 md:ml-16 md:-mr-16 md:text-left basis-2/5 xl:basis-1/3">
            <Skeleton className="w-full h-8 sm:h-10 max-w-80" />
            <Skeleton className="w-full h-5 max-w-60" />
            <Skeleton className="w-full h-5 max-w-32" />
            <Skeleton className="w-full h-5 max-w-60" />
            <Skeleton className="w-full h-16 max-w-96" />
            <Skeleton className="w-full h-10 max-w-24 rounded-3xl" />
          </div>
          <div className="relative basis-2/3 ">
            <div className="w-full bg-black-50 h-[37vw]"></div>
          </div>
        </div>
        {/* section2 */}
        <div className="px-3 pt-10 pb-1 mx-auto mt-10 sm:px-12 sm:pt-14 sm:pb-2 bg-bg-section2">
          <h2 className="ml-4 text-xl font-semibold sm:text-2xl">Danh sách tập</h2>
          <Skeleton className="w-full h-10 px-12 mt-4 rounded-md mb-7 sm:mb-12 sm:w-full" />
          <SKeletonMoviesCarousel />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="w-full">
      {/* neu videourl(da chon tap phim) khac '' thi hien thi video thay cho thong tin va hinh anh phim */}
      {movieUrl != "" ? (
        <div>
          <div>
            <iframe
              className="mx-auto w-[95vw] h-[40vw]"
              src={movieUrl}
              allowFullScreen
            ></iframe>
          </div>
          <div>
            <h1 className="inline-block ml-10 -mb-10 text-xl sm:ml-16 md:text-2xl">{`${movieDetail?.movie.name} - ${selectedEpisode}`}</h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col-reverse sm:items-center sm:flex-row">
          <div className="relative z-10 px-5 text-left sm:px-10 md:px-0 md:ml-16 md:-mr-16 basis-2/5 xl:basis-1/3">
            {/* su dung ? de khi null hay underfine ko bi loi ma se trả về giá trị là underfine */}
            <h1 className="text-2xl font-bold sm:text-3xl">
              {movieDetail?.movie.name}
            </h1>
            <div className="font-medium text-color-second">
              {movieDetail?.movie.origin_name ? (
                <h2>{`${movieDetail?.movie.origin_name} (${movieDetail.movie.year})`}</h2>
              ) : (
                ""
              )}
              <span className="block text-sm text-color-three">
                {movieDetail?.movie.episode_current}
              </span>
              <div className="hidden">
                <p className={`${isshowDesc ? "" : "line-clamp-3"} mt-3`}>
                  {movieDetail?.movie.content}
                </p>
                <button
                  onClick={handleShowDesc}
                  className="text-sm text-color-three hover:underline"
                >
                  {isshowDesc ? "Thu gọn" : "Xem thêm"}
                  <i
                    className={`fa-solid ${
                      isshowDesc ? "fa-chevron-up" : "fa-chevron-down"
                    } ml-1`}
                  ></i>
                </button>
              </div>
              <div className="mt-3">
                <p>
                  <span className="text-color-three">Thể loại: </span>
                  {movieDetail?.movie.category.map((categoryData, index) => (
                    <Link key={categoryData.id} to="">
                      {/* Đặt key ở cấp độ cao nhất của 1 phần tử
                   sdung index để ktra nếu k phải phần tử cuối cùng thì thêm dấu phẩy */}
                      <span className="transition-all hover:text-color-main last">
                        {index < movieDetail.movie.category.length - 1
                          ? `${categoryData.name}, `
                          : `${categoryData.name} `}
                      </span>
                    </Link>
                  ))}
                </p>
              </div>
              <div>
                <p>
                  <span className="text-color-three">Diễn viên:</span>
                  <span>{movieDetail?.movie.actor.join(", ")}</span>
                </p>
              </div>
            </div>
            <button
              onClick={scrollToEpisodeList}
              className="px-6 py-2 mt-3 font-medium text-white transition duration-300 ease-out delay-75 rounded-full bg-color-main hover:scale-95 hover:bg-color-main-hover"
            >
              Xem ngay
            </button>
          </div>
          <div className="relative basis-2/3 ">
            <img
              className="w-full object-cover h-[37vw]"
              src={movieDetail?.movie.thumb_url}
              alt={movieDetail?.movie.name}
            />
            <div className="absolute inset-0 w-full bg-gradient-to-r from-black via-transparent to-black"></div>
            <div className="absolute inset-0 w-full bg-gradient-to-t from-black via-transparent to-black"></div>
          </div>
        </div>
      )}

      <div
        // danh dau vi tri danh sach tap
        ref={episodeListRef}
        className="px-3 pt-10 pb-1 mx-auto mt-10 sm:px-12 sm:pt-14 sm:pb-2 bg-bg-section2"
      >
        {/* ds tập */}
        <div>
          <h3 className="ml-4 text-xl font-semibold sm:text-2xl">
            Danh sách tập
          </h3>
          <div className="flex flex-wrap gap-2 px-4 mt-2 mb-7 sm:mb-12">
            {movieDetail?.episodes[0].server_data.map((episodeDataa) => (
              <button
                key={episodeDataa.slug}
                onClick={() =>
                  handleChooseEpisode(
                    episodeDataa.name,
                    episodeDataa.link_embed
                  )
                }
                className={`mt-2 sm:w-20 w-16 h-10 border-[1px] border-gray-400 rounded-md ${
                  episodeDataa.name == selectedEpisode ? "bg-gray-500" : ""
                } hover:bg-gray-500`}
              >
                {episodeDataa.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <SameMovieList
            endpoint={`/the-loai/${movieDetail?.movie.category[0].slug}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
