import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <>
      <div className="m-2">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <Link to="/blog/details" className="page-link">
                Previous
              </Link>
            </li>
            <li className="page-item">
              <Link to="/blog/details" className="page-link">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link to="/blog/details" className="page-link">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link to="/blog/details" className="page-link">
                3
              </Link>
            </li>
            <li className="page-item">
              <Link to="/blog/details" className="page-link">
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
