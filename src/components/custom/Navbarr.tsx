import React, { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieSearchList from "./MovieSearchList";
import { Category } from "src/Services/MovieDetailServices";
import { getCategoryList } from "src/Services/CategoryService";

const Navbarr: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [keyword, setKeyword] = useState<string>("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>(keyword);

  const [isFocused, setIsFocused] = useState(false);

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
    }
    fetchCountryList();
    fetchCategiryList();
  }, []);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleMenuToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsAnimating(true);
    }
  };

  const handleAnimationEnd = () => {
    if (isAnimating) {
      setIsAnimating(false);
      setIsOpen(false);
    }
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
    <header className="sticky top-0 z-50 w-full bg-black">
      <div className="">
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
                      <Link
                        to={`/the-loai/${item.slug}`}
                        
                      >
                        <span className="block w-40 px-2 py-6  bg-[#141111]  hover:text-color-main-hover transition-all text-nowrap">{item.name}</span>
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
                      <Link
                        to={`/quoc-gia/${item.slug}`}
                        
                      >
                        <span className="block w-40 px-2 py-6  bg-[#141111]  hover:text-color-main-hover transition-all text-nowrap">{item.name}</span>
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
              <div className="bg-[#202629] lg:w-[30vw] sm:w-[60vw] w-[100vw] lg:right-0 sm:right-auto right-0 mt-1 fixed z-50 -ml-20 rounded-lg py-1 max-h-[85vh] overflow-auto">
                <MovieSearchList keyword={debouncedKeyword} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-end mr-5 lg:hidden basis-1/7">
            <button onClick={handleMenuToggle}>
              <i className="text-white fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbarr;
