import { listFilter } from "./data/searchFilter";

const SearchFilter = () => {
  return (
    <>
      <div className="accordion mb-3 mb-md-4" id="displayPriority">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#display"
              aria-expanded="true"
              aria-controls="display"
            >
              Ưu Tiên Hiển Thị
            </button>
          </h2>
          <div
            id="display"
            className="accordion-collapse collapse show"
            data-bs-parent="#displayPriority"
          >
            <div className="accordion-body py-4">
              <div className="mb-3">
                <button className="btn btn-primary me-4">Phù hợp nhất</button>
              </div>
              <div>
                <button className="btn btn-outline-primary">
                  Mới đăng tuyển
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {listFilter.map((index) => {
        return (
          <div
            className="accordion bg-white mb-4"
            id={`display${index.id}`}
            key={index.id}
          >
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${index.id}`}
                  aria-expanded="true"
                  aria-controls={index.id}
                >
                  {index.name}
                </button>
              </h2>
              <div
                id={index.id}
                className="accordion-collapse collapse show"
                data-bs-parent={`#display${index.id}`}
              >
                <div className="accordion-body">
                  <div>
                    {index.children?.map((item) => {
                      return (
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={item.id}
                          />
                          <label className="form-check-label" htmlFor={item.id}>
                            {index.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SearchFilter;
