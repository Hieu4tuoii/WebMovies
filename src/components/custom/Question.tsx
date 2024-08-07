import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion";

const Question: React.FC = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-2 py-8 mx-auto xl:max-w-4xl lg:max-w-3xl sm:max-w-xl"
    >
      <h2 className="text-xl font-semibold text-center sm:text-2xl">
        Câu hỏi thường gặp
      </h2>
      <AccordionItem value="item-1" className="border-b-[#212121] border-b-2">
        <AccordionTrigger>Phim Hỏa Tốc là gì?</AccordionTrigger>
        <AccordionContent>
          Phim Hỏa Tốc là trang web cung cấp dịch vụ xem phim trực tuyến miễn
          phí với một kho tàng phim phong phú từ nhiều thể loại khác nhau, bao
          gồm cả phim mới và phim cũ, đạc biệt chúng tôi không gắn link quảng cáo cho tất cả bộ phim.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2 " className="border-b-[#212121]  border-b-2" >
        <AccordionTrigger>
          Làm thế nào để xem phim trên Phim Hỏa Tốc?
        </AccordionTrigger>
        <AccordionContent>
          Để xem phim, bạn chỉ cần vào trang web, sử dụng thanh tìm kiếm hoặc
          duyệt qua các danh mục phim. Khi tìm thấy bộ phim muốn xem, chỉ cần
          nhấp vào tiêu đề phim để phát video.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border-b-[#212121]  border-b-2">
        <AccordionTrigger>Có quảng cáo khi xem phim không?</AccordionTrigger>
        <AccordionContent>
          Không, chúng tôi cung cấp phim hoàn toàn miễn phí không có quảng cáo, bạn chỉ cần truy
          cập và xem thoái mái.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" className="border-b-[#212121]  border-b-2">
        <AccordionTrigger>Có cần đăng ký tài khoản không?</AccordionTrigger>
        <AccordionContent>
          Không cần. Bạn có thể xem phim mà không cần đăng ký tài khoản. Tuy
          nhiên, nếu bạn muốn lưu lại lịch sử xem phim và nhận thông báo về phim
          mới, việc đăng ký tài khoản là hữu ích.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5" className="border-b-[#212121]  border-b-2">
        <AccordionTrigger>Có phụ đề cho phim không?</AccordionTrigger>
        <AccordionContent>
          Có, nhiều bộ phim trên trang web của chúng tôi có sẵn phụ đề. Bạn có
          thể chọn phụ đề khi xem phim nếu có.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6" className="border-b-[#212121] border-b-2">
        <AccordionTrigger>phim có chất lượng HD không?</AccordionTrigger>
        <AccordionContent>
          Có, nhiều bộ phim trên trang web của chúng tôi được cung cấp với chất
          lượng HD. Bạn có thể chọn chất lượng video khi xem phim để phù hợp với
          sở thích và điều kiện mạng của bạn.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Question;
