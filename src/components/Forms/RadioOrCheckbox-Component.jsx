export const InputCheckboxOrRadio = ({
    label = 'Default Label',
    type = 'checkbox',
    checked = false, // Cambiado a defaultChecked
    onChange = () => {}, // Solo se usa para manejar eventos opcionalmente
    name = '',
    id = '',
    className = '',
    disabled = false,
    required = false,
}) => {
    return (
        <div className="form-check my-3">
            <input
                type={type}
                className={`form-check-input ${className}`}
                id={id}
                name={name}
                checked={checked} // Valor inicial
                onChange={onChange} // Maneja eventos opcionalmente
                disabled={disabled}
                required={required}
            />
            {label && (
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
};
