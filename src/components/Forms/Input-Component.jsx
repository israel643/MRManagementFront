import React, { forwardRef } from 'react'

export const Input = forwardRef(({ label, name, value, id, error, ...props }, ref) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        defaultValue={value}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...props}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  )
})