import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { PopularBlogs } from "../blog/components";
import Tags from "../blog/components/Tags/Tags";
import RelatedBlogs from "../blog/components/RelatedBlogs/RelatedBlogs";
import styles from "./styles/blogDetails.module.scss";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { BlogDetail } from "../../types";
import { handleApiGetBlogDetails } from "../../apis/blog";
import { Loader } from "../../components";

const cx = classNames.bind(styles);

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(false);
  const [BlogDetails, setBlogDetails] = useState<BlogDetail | null>(null);

  useEffect(() => {
    if (!slug) {
      return;
    }
    const slugParts = slug.split("-");
    const id = slugParts.slice(-5).join("-");

    const fetchBlogDetails = async () => {
      setLoading(true);

      try {
        const response = await handleApiGetBlogDetails(id);

        if (response?.status === 200 && response.data) {
          setBlogDetails(response.data);
        } else {
          setBlogDetails(null);
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [slug]);
  return (
    <>
      <Helmet>
        <title>Mentoring - {BlogDetails?.title || "Đang tải..."}</title>
      </Helmet>

      {loading ? (
        <Loader />
      ) : BlogDetails ? (
        <>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className={cx("container-main")}>
                  <div className={cx("blog-category")}>Công nghệ</div>
                  <h1 className={cx("title-main")}>{BlogDetails.title}</h1>
                  <div className={cx("post-meta")}>
                    <img
                      src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
                      alt="Author"
                      className={cx("author-img")}
                      loading="lazy"
                    />
                    <span>Tác giả: Nguyễn Văn A</span>
                    <span> | </span>
                    <span>Ngày đăng: 08/03/2025</span>
                    <span> | </span>
                  </div>
                  <img
                    className={cx("thumbnail-image")}
                    src="https://accesstrade.vn/wp-content/uploads/2022/10/thiet-ke-website-chuan-seo-1.jpg"
                    alt=""
                  />
                  <div>
                    <p>
                      Thiết kế website chuẩn SEO đang trở thành một yêu cầu
                      <span>không thể thiếu</span> đối với mọi doanh nghiệp muốn
                      tồn tại và phát triển trong thời đại số. Trong bài viết
                      này, chúng ta sẽ cùng tìm hiểu những yếu tố quan trọng
                      nhất để tạo ra một website không chỉ đẹp mắt mà còn thân
                      thiện với các công cụ tìm kiếm.
                    </p>
                    <h2 className={cx("thumbnail-title")}>
                      1. Tối ưu tốc độ tải trang
                    </h2>
                    <p>
                      Google và các công cụ tìm kiếm khác đang ngày càng coi
                      trọng tốc độ tải trang như một yếu tố xếp hạng quan trọng.
                      Một website tải chậm không chỉ làm giảm trải nghiệm người
                      dùng mà còn ảnh hưởng nghiêm trọng đến thứ hạng SEO của
                      bạn. Theo nghiên cứu mới nhất,
                      <span>53% người dùng</span> sẽ rời khỏi trang web nếu nó
                      tải trong hơn 3 giây.
                    </p>
                    <p>Để tối ưu tốc độ tải trang, bạn cần:</p>
                    <ul>
                      <li>Sử dụng dịch vụ hosting chất lượng cao</li>
                      <li>Tối ưu hóa hình ảnh (nén và định dạng phù hợp)</li>
                      <li>Minify CSS, JavaScript và HTML</li>
                      <li>Sử dụng cache hiệu quả</li>
                      <li>Áp dụng lazy loading cho hình ảnh và video</li>
                    </ul>
                  </div>
                  <img
                    className={cx("thumbnail-image")}
                    src="https://timviec365.vn/pictures/images/biet-cach-lam-seo.jpg"
                    loading="lazy"
                  />
                  <h2 className={cx("thumbnail-title")}>
                    2. Thiết kế thích ứng (Responsive Design)
                  </h2>
                  <p>
                    Trong năm 2025, với hơn
                    <span>70% lưu lượng internet</span> đến từ thiết bị di động,
                    việc có một thiết kế website thích ứng không còn là lựa chọn
                    mà là điều bắt buộc. Google đã chính thức sử dụng phiên bản
                    di động làm cơ sở để đánh giá và xếp hạng website của bạn.
                  </p>
                  <p>
                    Một website responsive không chỉ hiển thị tốt trên mọi kích
                    thước màn hình mà còn mang lại trải nghiệm người dùng nhất
                    quán trên tất cả các thiết bị. Điều này cực kỳ quan trọng
                    khi xây dựng niềm tin với khách hàng và giảm tỷ lệ thoát
                    trang.
                  </p>
                  <h2 className={cx("thumbnail-title")}>
                    3. Cấu trúc URL và điều hướng thân thiện
                  </h2>
                  <p>
                    URL ngắn gọn, mô tả rõ ràng nội dung trang và dễ đọc sẽ giúp
                    cả người dùng và công cụ tìm kiếm hiểu nhanh về trang web
                    của bạn. Cấu trúc URL nên theo dạng phân cấp rõ ràng, sử
                    dụng từ khóa phù hợp và tránh các ký tự đặc biệt.
                  </p>
                  <p>
                    Bên cạnh đó, một hệ thống điều hướng rõ ràng với menu chính,
                    breadcrumbs, và sitemap sẽ giúp người dùng và bots tìm kiếm
                    dễ dàng khám phá nội dung trên website của bạn. Điều này
                    không chỉ cải thiện trải nghiệm người dùng mà còn tăng cường
                    khả năng crawl và index của Google.
                  </p>
                  {/* <hr className={cx("divider")} /> */}
                </div>
                <h2 className={cx("title")}>Bài viết liên quan</h2>
                <div className={cx("underline")} />

                <RelatedBlogs />
              </div>
              <div
                className="col-lg-3"
                style={{
                  position: "sticky",
                  top: "120px",
                  height: "fit-content",
                }}
              >
                {/* <SearchBlogs /> */}
                <Tags />
                <PopularBlogs />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Không tìm thấy bài viết</p>
      )}
    </>
  );
};

export default BlogDetails;
