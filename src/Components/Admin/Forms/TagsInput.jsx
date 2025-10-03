import { useState } from 'react';

const TagsInput = ({ value = [], onChange, disabled = false, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(
    (tag) => !value.includes(tag) && tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleAddTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed) && value.length < 10) {
      onChange([...value, trimmed]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemoveTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-3">
      <label className="form-label text-white">
        Tags
        <small className="text-white-50 ms-2">(Max 10 tags, press Enter or comma to add)</small>
      </label>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {value.map((tag, index) => (
          <span key={index} className="badge px-3 py-2" style={{ background: '#6A47ED', fontSize: '14px' }}>
            {tag}
            {!disabled && (
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                style={{ fontSize: '10px' }}
                onClick={() => handleRemoveTag(index)}
                aria-label="Remove"
              />
            )}
          </span>
        ))}
      </div>
      <div className="position-relative">
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
            if (inputValue.trim()) {
              handleAddTag(inputValue);
            }
          }}
          onFocus={() => setShowSuggestions(inputValue.length > 0)}
          disabled={disabled || value.length >= 10}
          placeholder={value.length >= 10 ? 'Maximum tags reached' : 'e.g., Marketing, SEO, Design'}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            className="position-absolute w-100 mt-1 bg-dark border border-secondary rounded shadow-lg"
            style={{ maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}
          >
            {filteredSuggestions.map((tag, index) => (
              <button
                key={index}
                type="button"
                className="btn btn-link text-white text-decoration-none d-block w-100 text-start px-3 py-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleAddTag(tag);
                }}
                style={{ fontSize: '14px' }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      {value.length >= 10 && (
        <small className="text-warning d-block mt-1">
          Maximum of 10 tags reached
        </small>
      )}
    </div>
  );
};

export default TagsInput;
