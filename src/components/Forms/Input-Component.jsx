const InputGeneral = ( {
    label,
    type,
    placeholder,
    value, 
    onChange, 
    name, 
    id,
    className, 
    disabled, 
    required 
}) => {

    return(
        <>
            <div className="mb-2">
                {label && <label htmlFor={id} className="form-label">{label}</label>}
                <input
                    type={type}
                    className={`form-control ${className}`}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                />
            </div>
        </>
    )
}

InputGeneral.defaultProps = {
    label: 'InputGeneral',
    type: 'text',
    placeholder: '',
    value: '', 
    onChange: () => {}, 
    name: '', 
    id: '',
    className: '', 
    disabled: false, 
    required: false 
}
export default InputGeneral;

