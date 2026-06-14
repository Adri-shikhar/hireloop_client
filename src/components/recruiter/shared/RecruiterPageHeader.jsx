import "./page-header.css";

export default function RecruiterPageHeader({ title, description, action, id }) {
  const headingId = id || "page-heading";

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
