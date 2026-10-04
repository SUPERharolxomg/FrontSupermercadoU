/**
 * Campo de formulario con etiqueta de Bootstrap.
 * Si recibe `options` dibuja un <select>; si no, un <input>.
 */
export default function FormField({ label, name, value, onChange, options, placeholder, help, col = 'col-md-6', ...inputProps }) {
  const id = `field-${name}`;
  return (
    <div className={col}>
      <label htmlFor={id} className="form-label">
        {label}
        {inputProps.required && <span className="text-danger ms-1">*</span>}
      </label>
      {options ? (
        <select id={id} name={name} value={value ?? ''} onChange={onChange} className="form-select" {...inputProps}>
          <option value="">{placeholder || 'Seleccione...'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
          {...inputProps}
        />
      )}
      {help && <div className="form-text">{help}</div>}
    </div>
  );
}
