export const PageSkeleton = () => (
  <div className="container py-5">
    <div className="row">
      <div className="col-12">
        <div className="placeholder-glow">
          <div className="placeholder col-4 bg-secondary mb-3" style={{ height: '40px' }}></div>
          <div className="placeholder col-8 bg-secondary mb-2" style={{ height: '20px' }}></div>
          <div className="placeholder col-6 bg-secondary mb-4" style={{ height: '20px' }}></div>
          <div className="placeholder col-12 bg-secondary" style={{ height: '300px' }}></div>
        </div>
      </div>
    </div>
  </div>
);

export const AdminSkeleton = () => (
  <div className="container py-5">
    <div className="placeholder-glow">
      <div className="placeholder col-3 bg-secondary mb-4" style={{ height: '40px' }}></div>
      <div className="row g-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-md-3">
            <div className="card bg-dark border-secondary">
              <div className="card-body">
                <div className="placeholder col-12 bg-secondary mb-2" style={{ height: '60px' }}></div>
                <div className="placeholder col-8 bg-secondary" style={{ height: '20px' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="card bg-dark border-secondary">
    <div className="card-body">
      <div className="placeholder-glow">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mb-3">
            <div className="placeholder col-3 bg-secondary mb-2" style={{ height: '20px' }}></div>
            <div className="placeholder col-12 bg-secondary" style={{ height: '40px' }}></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
