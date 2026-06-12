/**
 * Accessible page header with semantic heading structure.
 */
export default function PageHeader({ title, description, action, id, variant = "default" }) {
  const headingId = id || "page-heading";

  if (variant === "recruiter") {
    return (
      <header className="rd-page-header">
        <div>
          <h1 id={headingId}>{title}</h1>
          {description && <p aria-describedby={headingId}>{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </header>
    );
  }

  return (
    <header className="page-header">
      <div className="page-header-text">
        <h1 id={headingId}>{title}</h1>
        {description && <p aria-describedby={headingId}>{description}</p>}
      </div>
      {action && (
        <div className="page-header-action" role="toolbar" aria-label={`${title} actions`}>
          {action}
        </div>
      )}
    </header>
  );
}
