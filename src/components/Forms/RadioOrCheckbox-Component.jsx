const InputCheckboxOrRadio = ({
    label,
    type, // Puede ser 'checkbox' o 'radio'
    checked,
    onChange,
    name,
    id,
    className,
    disabled,
    required 
}) => {
    return(
        <>
            <div className="form-check mb-2">
                <input
                    type={type}
                    className={`form-check-input ${className}`}
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                />
                {label && (
                    <label className="form-check-label" htmlFor={id}>
                        {label}
                    </label>
                )}
            </div>
        </>
    )
}

InputCheckboxOrRadio.defaultProps = {
    label: 'Default Label',
    type: 'checkbox',
    checked: false,
    onChange: () => {},
    name: '',
    id: '',
    className: '',
    disabled: false,
    required: false,
}

export default InputCheckboxOrRadio;