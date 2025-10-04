import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="error-section section-padding fix">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="error-items text-center">
              <div className="error-image">
                <img src="/assets/img/404.png" alt="404" />
              </div>
              <h2 className="mt-5 mb-4">Page Not Found</h2>
              <p className="mb-5">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Link to="/" className="theme-btn">
                Back To Home <i className="fa-solid fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
