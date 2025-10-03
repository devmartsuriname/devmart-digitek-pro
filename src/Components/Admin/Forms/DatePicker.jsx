const DatePicker = ({ label, value, onChange, error, required = false, disabled = false }) => {
  return (
    <div className="mb-3">
      <label className="form-label text-white">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        type="date"
        className={`form-control bg-dark text-white border-secondary ${error ? 'is-invalid' : ''}`}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{
          colorScheme: 'dark'
        }}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default DatePicker;
