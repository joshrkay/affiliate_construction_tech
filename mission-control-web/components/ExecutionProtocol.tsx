export default function ExecutionProtocol() {
  return (
    <div className="card">
      <h2>Execution Protocol</h2>
      <p className="muted">Daily operating rules to prevent drift and enforce shipped outcomes.</p>

      <ul className="protocol-list">
        <li><strong>Output-first:</strong> pages/content shipped outrank UI/platform polish.</li>
        <li><strong>Strict ACK gate:</strong> no task starts without STARTING + ETA + first deliverable.</li>
        <li><strong>Dependency-first dispatch:</strong> unblock prerequisites before assignment.</li>
        <li><strong>Timeout policy:</strong> one timeout ⇒ immediate reassignment/escalation.</li>
        <li><strong>Proof standard:</strong> every update must include file path, URL, or commit.</li>
        <li><strong>Escalation SLA:</strong> blockers older than 30 min require explicit decision request.</li>
      </ul>
    </div>
  );
}
