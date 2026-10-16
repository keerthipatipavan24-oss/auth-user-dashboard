import "./Card.css";

export default function Card({ title, value, icon }) {
  return (
    <div className="common-card">
      <p className="common-card-title">{title}</p>

      <div className="common-card-content">
        <span className="common-card-icon">{icon}</span>
        <h2 className="common-card-value">{value}</h2>
      </div>
    </div>
  );
}
