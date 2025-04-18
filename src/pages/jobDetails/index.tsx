import { Helmet } from "react-helmet";

import JobCard from "./components/JobCard";

import styles from "./styles/jobDetail.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const JobDetailsPage = () => {
  return (
    <>
      <Helmet>
        <title>Mentoring - Thông Tin Việc Làm</title>
      </Helmet>

      <div>
        <div className="container mt-4">
          <div className={cx("jobs-sumary", "p-4", "shadow-sm")}>
            <div className="row align-items-center">
              <div className="col-md-2 text-center">
                <img
                  src="/assets/images/LOGO.svg"
                  alt="Logo Công Ty"
                  className="img-fluid"
                  style={{ height: 150 }}
                />
              </div>
              <div className="col-md-10">
                <h6 className="text-muted">Công Ty TNHH Cch Top (Vn)</h6>
                <h4 className="fw-bold">Nhân Viên An Toàn Lao Động - HSE</h4>
                <div className="d-md-flex align-items-center justify-content-between">
                  <div className="me-3">
                    <p className="mb-1 mb-md-0">
                      <strong>Mức lương:</strong>
                      <span className="text-primary ms-2">8 - 11 triệu</span>
                    </p>
                  </div>
                  <div className="me-3">
                    <p className="mb-1 mb-md-0">
                      <strong>Hạn nộp hồ sơ:</strong> 31/03/2025
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 mb-md-0">
                      <strong>Khu vực tuyển:</strong> TP.HCM
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-primary">Nộp hồ sơ</button>
                  <button className="btn btn-outline-secondary ms-3">❤</button>
                </div>
                <div className="text-muted mt-2">
                  <small>
                    <i className="bi bi-calendar" /> Ngày cập nhật: 12/03/2025
                    15:11
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <div className="row">
            {/* Cột trái: Chi tiết tuyển dụng */}
            <div className="col-md-8">
              <h4 className={cx("fw-bold, title")}>Chi tiết tuyển dụng</h4>
              <div className={cx("container-main")}>
                <h3 className="fw-bold mt-3">Thông tin chung</h3>
                <div className={cx("info-box")}>
                  <div className="row">
                    <div className={cx("col-md-6 icon-text")}>
                      <span>📅</span> Ngày đăng:{" "}
                      <strong className="ms-2">06/03/2025</strong>
                    </div>
                    <div className={cx("col-md-6 icon-text")}>
                      <span>⏳</span> Thời gian thử việc:{" "}
                      <strong className="ms-2">2 tháng</strong>
                    </div>
                    <div className={cx("col-md-6 icon-text")}>
                      <span>🎖</span> Cấp bậc:
                      <strong className="ms-2">Chuyên viên - Nhân viên</strong>
                    </div>
                    <div className={cx("col-md-6 icon-text")}>
                      <span>👥</span> Số lượng tuyển:{" "}
                      <strong className="ms-2">2</strong>
                    </div>
                    <div className={cx("col-md-6 icon-text")}>
                      <span>🎓</span> Yêu cầu bằng cấp:{" "}
                      <strong className="ms-2">Đại học</strong>
                    </div>
                    <div className={cx("col-md-6 icon-text")}>
                      <span>🛠</span> Hình thức làm việc:
                      <strong className="ms-2">Toàn thời gian cố định</strong>
                    </div>
                    <div className={cx("col-md-6 icon-text")}>
                      <span>⭐</span> Yêu cầu kinh nghiệm:
                      <strong className="ms-2">Dưới 1 năm</strong>
                    </div>
                    <div className={cx("info-box-items, col-md-6, icon-text")}>
                      <span>📂</span> Ngành nghề:
                      <a
                        href="#"
                        className="text-primary text-decoration-none ms-2"
                      >
                        An toàn lao động / Môi trường
                      </a>
                    </div>
                  </div>
                </div>
                <h4 className="mt-4 fw-bold">Mô tả công việc</h4>
                <ul>
                  <li>
                    Quản lý việc tuân thủ các tiêu chuẩn về sức khỏe, môi
                    trường, an toàn, an ninh.
                  </li>
                  <li>
                    Giám sát việc thực hiện các chính sách ATLD của nhà máy.
                  </li>
                  <li>Đánh giá rủi ro về ATLD.</li>
                </ul>
                <h4 className="mt-4 fw-bold">Yêu cầu công việc</h4>
                <ul>
                  <li>Tuổi từ 20-35, sức khỏe tốt</li>
                  <li>
                    Tốt nghiệp Đại học Văn bằng Kỹ sư Bảo Hộ Lao Động hoặc Kỹ Sư
                    Môi Trường....
                  </li>
                  <li>Tiếng Anh đọc viết.</li>
                  <li>
                    Biết sử dụng vi tính văn phòng (Word, Excel, PowerPoint
                    ...).
                  </li>
                  <li>Nhanh nhẹn, cẩn thận, chịu khó trong công việc.</li>
                </ul>
                <h4 className="mt-4 fw-bold">Quyền lợi</h4>
                <ul>
                  <li>
                    Người lao động được đóng BHXH, BHYT, BHTN theo Luật lao
                    động;
                  </li>
                  <li>
                    Môi trường làm việc thân thiện, năng động, chuyên nghiệp và
                    nhiều cơ hội phát triển.
                  </li>
                  <li>Trợ cấp nhà trọ, xăng dầu, sinh hoạt, quà Lễ tết.</li>
                  <li>
                    Các chính sách phúc lợi khác và lương tháng 13 của công ty.
                  </li>
                  <li>
                    Mức lương xứng đáng với năng lực làm việc, chi tiết mức
                    lương sẽ trao đổi thêm trong quá trình phỏng vấn.
                  </li>
                </ul>
                <h4 className="mt-4 fw-bold">Địa điểm làm việc</h4>
                <p>📍 Tòa nhà cao đẳng SaiGonTech</p>
                <button className="btn btn-primary">Nộp hồ sơ</button>
              </div>
            </div>
            {/* Cột phải: Việc làm tương tự */}
            <div className="col-md-4">
              <h4 className={cx("fw-bold, title")}>
                Việc làm tương tự cho bạn
              </h4>
              <JobCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;
