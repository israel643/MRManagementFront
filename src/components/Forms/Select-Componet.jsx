const SelectGeneral = ({
    label,
    options, // Lista de opciones para el select
    value,
    onChange,
    name,
    id,
    className,
    disabled,
    required,
}) => {
    return(
        <>
            <div className="mb-3">
                {label && <label htmlFor={id} className="form-label">{label}</label>}
                <select
                    className={`form-select ${className}`}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                >
                    <option value="">-- Selecciona --</option>
                    {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
            </div>
        </>
    )
}

SelectGeneral.defaultProps = {
    label: '',
    options: [],
    value: '',
    onChange: () => {},
    name: '',
    id: '',
    className: '',
    disabled: false,
    required: false,
}


export default SelectGeneral;