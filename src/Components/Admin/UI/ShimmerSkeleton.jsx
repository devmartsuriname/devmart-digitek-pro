/**
 * ShimmerSkeleton Component
 * Animated loading skeleton with shimmer effect
 */

export const ShimmerSkeleton = ({ width = '100%', height = '20px', className = '' }) => {
  return (
    <div 
      className={`shimmer-skeleton rounded ${className}`}
      style={{ width, height }}
      aria-label="Loading..."
    />
  );
};

export const CardSkeleton = () => (
  <div className="card bg-dark border-0 shadow-sm" style={{ padding: '0.75rem' }}>
    <div className="card-body p-0">
      <div className="d-flex flex-column align-items-center text-center">
        <ShimmerSkeleton width="60px" height="60px" className="mb-3 rounded-circle" />
        <ShimmerSkeleton width="80px" height="32px" className="mb-2" />
        <ShimmerSkeleton width="120px" height="16px" />
      </div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="table-responsive">
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          {[1, 2, 3, 4].map((i) => (
            <th key={i}>
              <ShimmerSkeleton width="80px" height="16px" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            {[1, 2, 3, 4].map((j) => (
              <td key={j}>
                <ShimmerSkeleton width="100px" height="16px" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ShimmerSkeleton;
