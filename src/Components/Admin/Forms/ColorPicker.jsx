const ColorPicker = ({ value, onChange, error }) => {
  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <input
          type="color"
          value={value || '#6A47ED'}
          onChange={(e) => onChange(e.target.value)}
          className="form-control form-control-color"
          style={{ width: '60px', height: '40px' }}
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#6A47ED"
          className="form-control"
          maxLength={7}
          pattern="^#[0-9A-Fa-f]{6}$"
        />
        <div
          className="border rounded"
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: value || '#6A47ED',
          }}
        />
      </div>
      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
};

export default ColorPicker;
