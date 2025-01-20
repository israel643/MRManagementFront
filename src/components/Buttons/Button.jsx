import React from 'react'

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = 'btn btn-custom'
  const variantClass = `btn-${variant}`

  return (
    <button
      className={`btn ${baseClass} my-3 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}