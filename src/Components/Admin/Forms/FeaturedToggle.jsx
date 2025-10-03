const FeaturedToggle = ({ value, onChange, disabled = false }) => {
  return (
    <div className="mb-3">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="featuredToggle"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
        <label className="form-check-label text-white" htmlFor="featuredToggle">
          Featured Project
          <small className="d-block text-white-50 mt-1">
            Featured projects appear on the homepage
          </small>
        </label>
      </div>
    </div>
  );
};

export default FeaturedToggle;
