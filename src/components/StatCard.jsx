import "../styles/StatCard.css";

function StatCard({ titulo, valor }) {
  return (
    <div className="stat-card">
      <h3>{titulo}</h3>
      <p>{valor}</p>
    </div>
  );
}

export default StatCard;