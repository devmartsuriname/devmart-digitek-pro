/**
 * HealthWidget Component
 * System health status indicator with API/DB metrics
 */

import { useState, useEffect } from 'react';

export default function HealthWidget() {
  const [metrics, setMetrics] = useState({
    apiResponseTime: 0,
    dbLatency: 0,
    status: 'checking',
  });

  useEffect(() => {
    // Simulate health check
    const checkHealth = () => {
      const apiTime = Math.floor(Math.random() * 80) + 80; // 80-160ms
      const dbTime = Math.floor(Math.random() * 30) + 30; // 30-60ms
      
      setMetrics({
        apiResponseTime: apiTime,
        dbLatency: dbTime,
        status: 'operational',
      });
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(180deg, #1a102e 0%, #0e081d 100%)' }}>
      <div className="card-body p-3">
        <h5 className="text-white mb-3" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
          <i className="bi bi-activity me-2"></i>System Health
        </h5>

        <div className="d-flex align-items-center mb-3">
          <div 
            className="rounded-circle me-2" 
            style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: metrics.status === 'operational' ? '#10b981' : '#6b7280',
              boxShadow: metrics.status === 'operational' ? '0 0 8px rgba(16, 185, 129, 0.5)' : 'none'
            }}
          ></div>
          <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
            {metrics.status === 'operational' ? 'Operational' : 'Checking...'}
          </span>
        </div>

        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-white-50" style={{ fontSize: '0.75rem' }}>
              API Response
            </span>
            <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              {metrics.apiResponseTime}ms
            </span>
          </div>
          <div className="progress" style={{ height: '4px' }}>
            <div 
              className="progress-bar bg-success" 
              role="progressbar" 
              style={{ width: `${Math.min((metrics.apiResponseTime / 200) * 100, 100)}%` }}
              aria-valuenow={metrics.apiResponseTime}
              aria-valuemin="0"
              aria-valuemax="200"
            ></div>
          </div>
        </div>

        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-white-50" style={{ fontSize: '0.75rem' }}>
              Database Latency
            </span>
            <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              {metrics.dbLatency}ms
            </span>
          </div>
          <div className="progress" style={{ height: '4px' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${Math.min((metrics.dbLatency / 100) * 100, 100)}%` }}
              aria-valuenow={metrics.dbLatency}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <p className="text-white-50 mb-0 mt-3" style={{ fontSize: '0.75rem' }}>
          <i className="bi bi-check-circle me-1"></i>
          All systems operational
        </p>
      </div>
    </div>
  );
}
