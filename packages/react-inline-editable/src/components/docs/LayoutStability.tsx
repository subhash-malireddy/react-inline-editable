export function LayoutStability() {
  return (
    <section id="layout-stability" className="mb-16">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-rust-dark)" }}>
        Layout Stability
      </h2>
      <div className="space-y-4" style={{ color: "var(--color-text-muted)" }}>
        <p>
          To prevent layout shift when switching between preview and edit modes,
          ensure consistent sizing between the preview and input elements.
        </p>
        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>
            Best Practices
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Use consistent <code className="text-sm">font-size</code>,{" "}
              <code className="text-sm">font-family</code>, and{" "}
              <code className="text-sm">line-height</code> between Preview and
              Write components
            </li>
            <li>
              Set <code className="text-sm">min-height</code> or fixed{" "}
              <code className="text-sm">height</code> on both elements
            </li>
            <li>
              Match <code className="text-sm">padding</code> and{" "}
              <code className="text-sm">margin</code> values
            </li>
            <li>
              For textareas, set <code className="text-sm">rows</code> prop to
              match expected content height
            </li>
            <li>
              Use <code className="text-sm">box-sizing: border-box</code> to
              ensure consistent width calculations
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>
            Example
          </h3>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.85em",
            }}
          >
            <code>{`<InlineEditable>
  <InlineEditable.Preview
    style={{
      minHeight: "2.5rem",
      padding: "0.5rem",
      fontSize: "1rem",
      lineHeight: "1.5",
    }}
  >
    {value}
  </InlineEditable.Preview>
  <InlineEditable.Write
    value={value}
    onChange={(e) => setValue(e.target.value)}
    style={{
      minHeight: "2.5rem",
      padding: "0.5rem",
      fontSize: "1rem",
      lineHeight: "1.5",
      width: "100%",
      boxSizing: "border-box",
    }}
  />
</InlineEditable>`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
