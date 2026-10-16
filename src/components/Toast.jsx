import "./Toast.css";

export default function Toast({ message, type = "success", onClose }) {
    if (!message) return null;

    return (
        <div className={`toast toast-${type}`} role="status">
            <span>{message}</span>

            <button type="button"
                className="toast-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    )
} 