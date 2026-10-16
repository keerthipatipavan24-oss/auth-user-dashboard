import "./Button.css";

export default function Button({
  text,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className="common-button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
} 