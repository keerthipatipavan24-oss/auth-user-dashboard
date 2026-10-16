import "./Input.css";

export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  rightElement,
  autoComplete,
}) {
  return (
    <div className="common-input-group">
      {label && <label htmlFor={id}>{label}</label>}

      <div className="common-input-wrapper">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />

        {rightElement}
      </div>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
}
