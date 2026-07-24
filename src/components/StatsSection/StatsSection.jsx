import "./StatsSection.css";

const metrics = [
  {
    id: 1,
    value: "100+",
    label: "LISTED PROPERTIES",
  },
  {
    id: 2,
    value: "15+",
    label: "CORPORATE PARTNERS",
  },
  {
    id: 3,
    value: "1K+",
    label: "HAPPY CUSTOMERS",
  },
  {
    id: 4,
    value: "99.8%",
    label: "BOARD EFFICIENCY",
  },
];

function StatsSection() {
  return (
    <section className="home-metrics-section">
      <div className="container">
        <div className="home-metrics-grid">
          {metrics.map((item) => (
            <div className="home-metric-card" key={item.id}>
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