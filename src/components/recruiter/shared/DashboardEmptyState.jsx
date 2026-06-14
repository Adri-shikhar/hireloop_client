import "./empty-state.css";

export default function DashboardEmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="rd-panel">
      <div className="rd-panel-body">
        <div className="rd-empty">
          <div className="rd-empty-visual">
            <div className="rd-empty-card">
              <div className="rd-empty-card-top">
                <div className="rd-empty-card-icon" />
                <div className="rd-empty-card-lines">
                  <div className="rd-empty-card-line accent" />
                  <div className="rd-empty-card-line short" />
                </div>
              </div>
              <div className="rd-empty-card-bottom">
                <div className="rd-empty-card-line" />
                <div className="rd-empty-card-line short" />
              </div>
            </div>
            <div className="rd-empty-badge">
              <Icon />
            </div>
          </div>

          <h2>{title}</h2>
          <p>{description}</p>
          {action}
        </div>
      </div>
    </div>
  );
}
