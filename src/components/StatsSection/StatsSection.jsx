import "./StatsSection.css";

const stats = [
  {
    id: 1,
    value: "2.4K+",
    label: "LISTED PROPERTIES",
  },
  {
    id: 2,
    value: "150+",
    label: "CORPORATE PARTNERS",
  },
  {
    id: 3,
    value: "₹1,500 Cr",
    label: "MANAGED ASSETS",
  },
  {
    id: 4,
    value: "99.8%",
    label: "BOARD EFFICIENCY",
  },
];

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container">

        <div className="stats-grid">

          {stats.map((item) => (
            <div className="stat-card" key={item.id}>

              <h2>{item.value}</h2>

              <p>{item.label}</p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default StatsSection;