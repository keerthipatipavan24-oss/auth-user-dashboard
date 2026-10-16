
import "./Modal.css";

export default function Modal({
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="modal-overlay">
      <div className="common-modal">
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="modal-confirm-button"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
 