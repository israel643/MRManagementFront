import React, { forwardRef } from 'react'

export const Select = forwardRef(({ label, id, name, options, value, error, ...props }, ref) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        ref={ref}
        id={id}
        name = {name}
        value={value}  
        className={`form-select ${error ? 'is-invalid' : ''}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
})