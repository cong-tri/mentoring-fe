import { useNavigate } from "react-router-dom";

const ListJobs = () => {
  const navigate = useNavigate();

  const jobs = Array.from({ length: 8 });
  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 gy-4 mb-4">
        {jobs.map((_, index) => {
          return (
            <>
              <div
                className="col"
                key={index}
                onClick={() => navigate("/job/details/:slug")}
              >
                <div
                  className="card bg-white rounded-4 shadow-lg p-3 p-lg-2"
                  role="button"
                >
                  <div className="card-header bg-transparent border-0">
                    <div className="hstack gap-3">
                      <div>
                        <h5 className="m-0">Fresher Developer</h5>
                      </div>
                      <div className="ms-auto">
                        <p className="text-secondary m-0">Không công khai</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border-bottom">
                    <div className="hstack gap-2 mb-3">
                      <div className="bg-secondary-subtle py-1 px-2 rounded-3">
                        Việc làm fulltime
                      </div>
                      <div className="bg-secondary-subtle py-1 px-2 rounded-3">
                        &lt;1 năm
                      </div>
                    </div>
                    <div className="hstack gap-2 mb-3">
                      <div className="bg-secondary-subtle py-1 px-2 rounded-3">
                        Tổi thiểu cử nhân
                      </div>
                      <div className="">
                        <button
                          className="btn btn-sm btn-secondary"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseHashtag"
                          aria-expanded="false"
                          aria-controls="collapseHashtag"
                        >
                          +2
                        </button>
                      </div>
                    </div>
                    <div className="collapse" id="collapseHashtag">
                      <div className="hstack gap-2 mb-3">
                        <div className="bg-secondary-subtle py-1 px-2 rounded-3">
                          Làm tại công ty
                        </div>
                        <div className="bg-secondary-subtle py-1 px-2 rounded-3">
                          Tiếng anh
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-secondary-subtle p-3 me-3">
                        <i className="fa-solid fa-user-tie fa-2x"></i>
                      </div>
                      <div>
                        <div className="hstack gap-2 mb-2">
                          <div className="text-center">
                            <i className="fa-solid fa-circle-check text-primary"></i>
                          </div>
                          <div>
                            <h5 className="text-primary mb-0">
                              Công ty TMA Solution
                            </h5>
                          </div>
                        </div>
                        <div className="hstack gap-2">
                          <div className="text-center">
                            <i className="fa-solid fa-location-dot text-danger"></i>
                          </div>
                          <div>
                            <p className="text-secondary mb-0">
                              Quận Bình Thạnh, Thành Phố HCM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="hstack gap-3">
                      <div>
                        <p className="text-success m-0">Mới đăng tuyển</p>
                      </div>
                      <div className="ms-auto">
                        <i className="fa-solid fa-bookmark text-warning fs-5"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ListJobs;
