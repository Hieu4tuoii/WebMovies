import React, { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieSearchList from "./MovieSearchList";
import { Category } from "src/Services/MovieDetailServices";
import { getCategoryList } from "src/Services/CategoryService";

const Navbarr: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>(keyword);

  const [isFocused, setIsFocused] = useState(false);

  

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300); // 0.5 giây
    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);
  const [country, setCountry] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  //get country list from endpoint quoc-gia

  // Fetch country list from endpoint quoc-gia
  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const countryList = await getCategoryList("/quoc-gia");
        setCountry(countryList);
      } catch (error) {
        console.error("Failed to fetch country list:", error);
      }
    };

    const fetchCategiryList = async () => {
      try {
        const categoryList = await getCategoryList("/the-loai");
        setCategory(categoryList);
      } catch (error) {
        console.error("Failed to fetch category list:", error);
      }
    };
    fetchCountryList();
    fetchCategiryList();
  }, []);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleFocusSearchInput = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setKeyword(""); // Reset keyword
    }, 200);
  };

  return (
    <div>
      <header className="sticky top-0 z-40 w-full bg-black">
        <div className="flex flex-row items-center justify-between py-4 ml-5 lg:ml-16 sm:mx-8">
          <div className="sm:basis-1/5 basis-2/7">
            <Link to="">
              <strong className="text-sm text-red-600 transition md:text-xl lg:text-2xl hover:text-color-main-hover">
                PHIMHOATOC
              </strong>
            </Link>
          </div>
          <nav className="hidden lg:block basis-3/5">
            <ul className="flex justify-center text-xl font-semibold text-white gap-14">
              <li className="transition-all hover:text-red-600 ">
                <a href="">Trang chủ</a>
              </li>
              <li className="relative transition-all hover:text-red-600 group">
                <a href="#">
                  Thể loại <i className="fa-solid fa-chevron-down"></i>{" "}
                </a>
                <ul className="-right-[200%] w-[500%] text-white absolute hidden pt-1  group-hover:grid  grid-cols-4">
                  {category.map((item, index) => (
                    <li
                      className={index < 16 ? "block" : "hidden"}
                      key={item.id}
                    >
                      <Link to={`/the-loai/${item.slug}`}>
                        <span className="block w-40 px-2 py-6  bg-[#141111]  hover:text-color-main-hover transition-all text-nowrap">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="relative transition-all hover:text-red-600 group">
                <a href="#">
                  Quốc gia <i className="fa-solid fa-chevron-down"></i>{" "}
                </a>
                <ul className="-right-[200%] w-[500%] text-white absolute hidden pt-1  group-hover:grid  grid-cols-4">
                  {country.map((item, index) => (
                    <li
                      className={index < 16 ? "block" : "hidden"}
                      key={item.id}
                    >
                      <Link to={`/quoc-gia/${item.slug}`}>
                        <span className="block w-40 px-2 py-6  bg-[#141111]  hover:text-color-main-hover transition-all text-nowrap">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
          <div className="relative w-full mr-5 lg:basis-1/5 basis-1/2">
            <div className="flex flex-row justify-end ">
              <form action="" className="block ">
                <input
                  onFocus={handleFocusSearchInput}
                  onBlur={handleBlur}
                  onChange={handleSearchInput}
                  value={keyword}
                  type="text"
                  placeholder="Tìm kiếm"
                  className="w-full px-2 py-1 rounded-md bg-[#141111] border border-[#5F5F5F] text-white"
                />
                <button
                  type="button"
                  className="relative px-2 py-1 -ml-8 bg-red-600 rounded-md"
                >
                  <i className="text-white fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            {debouncedKeyword.length !== 0 && isFocused ? (
              <div className="bg-bg-section3 lg:w-[30vw] sm:w-[60vw] w-[100vw] lg:right-0 sm:right-auto right-0 mt-1 fixed z-50 -ml-20 rounded-lg py-1 max-h-[85vh] overflow-auto">
                <MovieSearchList keyword={debouncedKeyword} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-end mr-5 lg:hidden basis-1/7 ">
            <input
              type="checkbox"
              id="check-show-menu-bar"
              className="peer/check-show-menu-bar"
            />
            <label htmlFor="check-show-menu-bar">
              <i className="text-white fa-solid fa-bars"></i>
            </label>

            <nav className="absolute top-0 z-50 h-screen transition-all duration-1000 ease-in-out bg-bg-section3 -right-96 peer-checked/check-show-menu-bar:right-0 w-96">
              <label htmlFor="check-show-menu-bar" className="absolute text-xl top-3 left-3">
                <i className="text-white fa-solid fa-xmark"></i>
              </label>
              <ul className="text-lg text-end">
                <li className="p-3">Trang chủ</li>
                <li className="relative p-3 transition-all hover:text-red-600 group">
                <i className="rotate-90 fa-solid fa-chevron-down"></i>{" "} Quốc gia
                <ul className="-right-[200%] w-[500%] text-white absolute hidden pt-1  group-hover:grid  grid-cols-4">
                  {country.map((item, index) => (
                    <li
                      className={index < 16 ? "block" : "hidden"}
                      key={item.id}
                    >
                      <Link to={`/quoc-gia/${item.slug}`}>
                        <span className="block w-40 px-2 py-6  bg-[#141111]  hover:text-color-main-hover transition-all text-nowrap">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="relative p-3 transition-all hover:text-red-600 group">
                <i className="rotate-90 fa-solid fa-chevron-down"></i>{" "} Thể loại
                <ul className="-right-[200%] w-[500%] text-white absolute hidden pt-1  group-hover:grid  grid-cols-4">
                  {category.map((item, index) => (
                    <li
                      className={index < 16 ? "block" : "hidden"}
                      key={item.id}
                    >
                      <Link to={`/the-loai/${item.slug}`}>
                        <span className="block w-40 px-2 py-6  bg-[#141111]  hover:text-color-main-hover transition-all text-nowrap">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbarr;
