export function Accessibility() {
  return (
    <section id="accessibility" className="mb-16">
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--color-rust-dark)" }}
      >
        Accessibility Best Practices
      </h2>
      <div className="space-y-6" style={{ color: "var(--color-text-muted)" }}>
        <div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Keyboard Navigation
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Preview components are keyboard accessible by default with{" "}
              <code className="text-sm">
                {'activationMode={["click", "enter"]}'}
              </code>
            </li>
            <li>
              Use <code className="text-sm">tabIndex={0}</code> if Preview
              renders as a non-interactive element
            </li>
            <li>
              Escape key cancels editing (when{" "}
              <code className="text-sm">deactivationMode</code> includes "esc")
            </li>
            <li>
              Enter key saves for inputs, Cmd/Ctrl+Enter for textareas (when
              enabled)
            </li>
          </ul>
        </div>

        <div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Screen Readers
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Preview should clearly indicate it's editable (e.g., "Click to
              edit" in aria-label or visually)
            </li>
            <li>
              Use <code className="text-sm">aria-label</code> on EditTrigger
              buttons for icon-only buttons
            </li>
            <li>
              Provide <code className="text-sm">aria-live</code> regions for
              save/cancel announcements if needed
            </li>
            <li>
              Ensure focus management: input receives focus when entering edit
              mode
            </li>
          </ul>
        </div>

        <div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Focus Management
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              The library automatically focuses the input when entering edit
              mode
            </li>
            <li>
              Use <code className="text-sm">onExitWriteMode</code> to restore
              focus to Preview if needed
            </li>
            <li>
              Avoid trapping focus - ensure users can tab away from edit mode
            </li>
          </ul>
        </div>

        <div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Example: Accessible Implementation
          </h3>
          <pre
            className="p-4 rounded-md overflow-x-auto"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.85em",
            }}
          >
            <code>{`<InlineEditable
  onEnterWriteMode={() => {
    // Announce to screen readers
    announce("Editing started");
  }}
  onSave={() => {
    announce("Changes saved");
  }}
>
  <InlineEditable.Preview
    as="div"
    role="button"
    tabIndex={0}
    aria-label="Click to edit title"
  >
    {title}
  </InlineEditable.Preview>
  <InlineEditable.Write
    value={title}
    onChange={handleChange}
    aria-label="Edit title"
  />
  <InlineEditable.EditTrigger aria-label="Edit title">
    <EditIcon />
  </InlineEditable.EditTrigger>
</InlineEditable>`}</code>
          </pre>
        </div>

        <div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Double-Click Mode
          </h3>
          <p>
            For content that might be accidentally activated, use{" "}
            <code className="text-sm">
              {'activationMode={["dblclick", "enter"]}'}
            </code>{" "}
            to require double-click while maintaining keyboard accessibility:
          </p>
          <pre
            className="p-4 rounded-md overflow-x-auto mt-2"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              fontFamily: "monospace",
              fontSize: "0.85em",
            }}
          >
            <code>{`<InlineEditable.Preview activationMode={["dblclick", "enter"]}>
  {value}
</InlineEditable.Preview>`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
