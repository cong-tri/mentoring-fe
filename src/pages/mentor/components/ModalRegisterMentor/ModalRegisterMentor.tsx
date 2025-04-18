import classNames from "classnames/bind";
import styles from "./styles/modalRegisterMentor.module.scss";

const cx = classNames.bind(styles);

const ModalRegisterMentor = () => {
  return (
    <div
      className={`modal fade ${cx("mentor_popup")}`}
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-3" id="exampleModalLabel">
              Đăng ký tư vấn
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="card shadow-lg rounded-3">
              <div className="card-body">
                <form action="">
                  <div className="row row-cols-1 row-cols-lg-2 mb-4">
                    <div className="col">
                      <div className="form-group">
                        <label className="form-label" htmlFor="username">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          id="username"
                          className="form-control"
                          placeholder="Nhập họ và tên"
                        />
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          className="form-control"
                          placeholder="Nhập email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row row-cols-1 row-cols-lg-2 mb-4">
                    <div className="col">
                      <div className="form-group">
                        <label className="form-label" htmlFor="phonenumber">
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          id="phonenumber"
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group">
                        <label className="form-label" htmlFor="username">
                          Chuyên môn
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Chọn chuyên môn</option>
                          <option value={1}>One</option>
                          <option value={2}>Two</option>
                          <option value={3}>Three</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="note" className="form-label">
                      Ghi chú
                    </label>
                    <textarea
                      className="form-control"
                      name="note"
                      id="note"
                      rows={5}
                      placeholder="Nhập ghi chú"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      className={`${cx("mentor_popup-btn")}`}
                      type="button"
                    >
                      Đăng ký tư vấn
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRegisterMentor;
