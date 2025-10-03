import { useState } from 'react';

const TechStackChips = ({ value = [], onChange, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddChip = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddChip();
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemoveChip = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-3">
      <label className="form-label text-white">
        Tech Stack
        <small className="text-white-50 ms-2">(Press Enter or comma to add)</small>
      </label>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {value.map((tech, index) => (
          <span key={index} className="badge px-3 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
            {tech}
            {!disabled && (
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                style={{ fontSize: '10px' }}
                onClick={() => handleRemoveChip(index)}
                aria-label="Remove"
              />
            )}
          </span>
        ))}
      </div>
      <input
        type="text"
        className="form-control bg-dark text-white border-secondary"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleAddChip}
        disabled={disabled}
        placeholder="e.g., React, Node.js, MongoDB"
      />
    </div>
  );
};

export default TechStackChips;
