/**
 * StatCard Component
 * Compact metric display card with hover effects and trend indicators
 */

export default function StatCard({ 
  icon, 
  value, 
  label, 
  trend, 
  color = 'text-primary',
  isLoading = false 
}) {
  return (
    <div className="stat-card card border-0 shadow-sm h-100">
      <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-3">
        <i className={`bi ${icon} ${color} mb-2`} style={{ fontSize: '2.5rem' }}></i>
        <h3 className="text-white mb-1" style={{ fontSize: '2rem', fontWeight: '700' }}>
          {isLoading ? '...' : value}
        </h3>
        <p className="text-white-50 mb-0" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
          {label}
        </p>
        {trend && (
          <span className="badge bg-success mt-2" style={{ fontSize: '0.75rem' }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
