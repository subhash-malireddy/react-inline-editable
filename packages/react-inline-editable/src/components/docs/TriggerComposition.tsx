export function TriggerComposition() {
  return (
    <section id="trigger-composition" className="mb-16">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-rust-dark)" }}>
        Trigger Composition Patterns
      </h2>
      <div className="space-y-6" style={{ color: "var(--color-text-muted)" }}>
        <p>
          The trigger components support the <code className="text-sm">as</code> and{" "}
          <code className="text-sm">asChild</code> props for maximum composition flexibility.
        </p>

        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>
            Using <code className="text-sm">as</code> prop
          </h3>
          <p className="mb-3">
            Render triggers as different HTML elements:
          </p>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.85em",
            }}
          >
            <code>{`<InlineEditable.SaveTrigger as="div" className="save-button">
  Save Changes
</InlineEditable.SaveTrigger>`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>
            Icon Buttons
          </h3>
          <p className="mb-3">
            Combine triggers with icons for compact UI:
          </p>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.85em",
            }}
          >
            <code>{`<InlineEditable.Controls className="flex gap-2">
  <InlineEditable.CancelTrigger className="icon-button">
    <XIcon />
  </InlineEditable.CancelTrigger>
  <InlineEditable.SaveTrigger className="icon-button">
    <CheckIcon />
  </InlineEditable.SaveTrigger>
</InlineEditable.Controls>`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>
            Custom Edit Button
          </h3>
          <p className="mb-3">
            Use EditTrigger with Preview that has no automatic activation:
          </p>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.85em",
            }}
          >
            <code>{`<InlineEditable>
  <div className="flex items-center gap-2">
    <InlineEditable.Preview activationMode={["none"]}>
      {value}
    </InlineEditable.Preview>
    <InlineEditable.EditTrigger className="edit-icon-button">
      <EditIcon />
    </InlineEditable.EditTrigger>
  </div>
  <InlineEditable.Write value={value} onChange={handleChange} />
</InlineEditable>`}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>
            Explicit Controls Only
          </h3>
          <p className="mb-3">
            Disable automatic deactivation and require explicit save/cancel:
          </p>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.85em",
            }}
          >
            <code>{`<InlineEditable>
  <InlineEditable.Preview>{value}</InlineEditable.Preview>
  <InlineEditable.Write
    value={value}
    onChange={handleChange}
    deactivationMode={["none"]}
  />
  <InlineEditable.Controls>
    <InlineEditable.CancelTrigger>Cancel</InlineEditable.CancelTrigger>
    <InlineEditable.SaveTrigger>Save</InlineEditable.SaveTrigger>
  </InlineEditable.Controls>
</InlineEditable>`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
