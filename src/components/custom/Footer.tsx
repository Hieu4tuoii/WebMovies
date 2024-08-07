import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black border-t border-t-[#374151] text-color-second ">
      <div className="px-6 mx-auto md:px-15 xl:px-20 sm:px-10">
        <div className="flex flex-col text-sm text-center sm:justify-between sm:text-left sm:flex-row">
          {/* Logo và Mô Tả */}
          <div className="sm:basis-1/3">
            <h2 className="text-2xl font-bold text-white">Phim Hỏa Tốc</h2>
            <p className="">
              Phim Hỏa Tốc là trang web cung cấp dịch vụ xem phim trực tuyến miễn phí với một kho tàng phim phong phú từ nhiều thể loại khác nhau, bao gồm cả phim mới và phim cũ.
            </p>
          </div>
          {/* Liên Kết Quan Trọng */}
          <nav aria-label="Footer Navigation">
            <h3 className="text-xl font-semibold text-white mt-7 sm:mt-0">Liên Kết Nhanh</h3>
            <ul className="space-y-2 ">
              <li><a href="/about" title="Về chúng tôi" className="hover:underline">Về Chúng Tôi</a></li>
              <li><a href="/privacy" title="Chính sách bảo mật" className="hover:underline">Chính Sách Bảo Mật</a></li>
              <li><a href="/terms" title="Điều khoản dịch vụ" className="hover:underline">Điều Khoản Dịch Vụ</a></li>
              <li><a href="/faq" title="Câu hỏi thường gặp" className="hover:underline">FAQ</a></li>
              <li><a href="/contact" title="Liên hệ" className="hover:underline">Liên Hệ</a></li>
            </ul>
          </nav>
          {/* Mạng Xã Hội */}
          <div >
            <h3 className="text-xl font-semibold text-white mt-7 sm:mt-0">Theo Dõi Chúng Tôi</h3>
            <div className="flex justify-center gap-3 mt-1 sm:justify-start">
              <a href="https://facebook.com" title="Facebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://twitter.com" title="Twitter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://instagram.com" title="Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://linkedin.com" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fa-brands fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-4 mt-8 text-center border-t border-gray-700">
          <p>&copy; 2024 Phim Hỏa Tốc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
