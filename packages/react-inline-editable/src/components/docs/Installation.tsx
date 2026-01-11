export function Installation() {
  return (
    <section id="installation" className="mb-16">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-rust-dark)" }}>
        Installation
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">npm</h3>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.9em",
            }}
          >
            <code>npm install react-inline-editable</code>
          </pre>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">pnpm</h3>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.9em",
            }}
          >
            <code>pnpm add react-inline-editable</code>
          </pre>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">yarn</h3>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.9em",
            }}
          >
            <code>yarn add react-inline-editable</code>
          </pre>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <p style={{ color: "var(--color-text-muted)" }}>
            React 18+ or React 19+ is required. This library has zero external
            dependencies.
          </p>
        </div>
      </div>
    </section>
  );
}
