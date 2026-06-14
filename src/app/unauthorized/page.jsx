export default function UnauthorizedPage() {
  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 480, margin: "80px auto", textAlign: "center" }}>
        <h1>401 — Unauthorized</h1>
        <p className="subtitle">You need to sign in to access this page.</p>
      </div>
    </div>
  );
}
