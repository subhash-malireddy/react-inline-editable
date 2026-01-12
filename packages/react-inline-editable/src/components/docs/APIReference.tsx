export function APIReference() {
  return (
    <section id="api-reference" className="mb-16">
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--color-rust-dark)" }}
      >
        API Reference
      </h2>
      <div className="space-y-8">
        {/* InlineEditable */}
        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            <code className="text-lg">InlineEditable</code>
          </h3>
          <p className="mb-3" style={{ color: "var(--color-text-muted)" }}>
            Provider component that manages inline editing state. Renders
            children directly (no wrapper DOM element).
          </p>
          <div className="mb-4">
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Props
            </h4>
            <ul
              className="space-y-2 ml-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              <li>
                <code className="text-sm">
                  onEnterWriteMode?: () =&gt; void
                </code>{" "}
                - Callback when entering write mode
              </li>
              <li>
                <code className="text-sm">onExitWriteMode?: () =&gt; void</code>{" "}
                - Callback when exiting write mode
              </li>
              <li>
                <code className="text-sm">
                  onSave?: (value: string, helpers: InlineEditHelpers) =&gt;
                  void | Promise&lt;void&gt;
                </code>{" "}
                - Callback when saving. Receives current value and helper
                methods (exitWriteMode, cancel). Supports both sync and async.
                On error, component stays in edit mode unless
                helpers.exitWriteMode() is called.
              </li>
              <li>
                <code className="text-sm">onCancel?: () =&gt; void</code> -
                Callback when cancelling
              </li>
              <li>
                <code className="text-sm">children: ReactNode</code> - Child
                components
              </li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            <code className="text-lg">InlineEditable.Preview</code>
          </h3>
          <p className="mb-3" style={{ color: "var(--color-text-muted)" }}>
            Displays content when not in edit mode. Polymorphic - defaults to{" "}
            <code className="text-sm">&lt;span&gt;</code>, use{" "}
            <code className="text-sm">as</code> prop to change.
          </p>
          <div className="mb-4">
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Props
            </h4>
            <ul
              className="space-y-2 ml-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              <li>
                <code className="text-sm">as?: ElementType</code> - Element type
                to render (default: "span")
              </li>
              <li>
                <code className="text-sm">
                  activationMode?: ActivationMode[]
                </code>{" "}
                - How to enter edit mode (default: ["click", "enter"])
              </li>
              <li>
                <code className="text-sm">children: ReactNode</code> - Content
                to display
              </li>
              <li>All standard HTML element props (className, style, etc.)</li>
            </ul>
          </div>
        </div>

        {/* Write */}
        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            <code className="text-lg">InlineEditable.Write</code>
          </h3>
          <p className="mb-3" style={{ color: "var(--color-text-muted)" }}>
            Input element shown when in edit mode. Supports both controlled and
            uncontrolled patterns. Defaults to{" "}
            <code className="text-sm">&lt;input&gt;</code>.
          </p>
          <div className="mb-4">
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Controlled Mode Props
            </h4>
            <ul
              className="space-y-2 ml-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              <li>
                <code className="text-sm">value: string</code> - Current value
                (required)
              </li>
              <li>
                <code className="text-sm">onChange: (e) =&gt; void</code> -
                Change handler (required)
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Uncontrolled Mode Props
            </h4>
            <ul
              className="space-y-2 ml-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              <li>
                <code className="text-sm">defaultValue?: string</code> - Initial
                value
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Common Props
            </h4>
            <ul
              className="space-y-2 ml-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              <li>
                <code className="text-sm">
                  as?: "input" | "textarea" | "select"
                </code>{" "}
                - Element type (default: "input")
              </li>
              <li>
                <code className="text-sm">
                  deactivationMode?: DeactivationMode[]
                </code>{" "}
                - How to exit edit mode (default for input/select: ["blur",
                "esc", "enter"], default for textarea: ["blur", "esc",
                "cmd+enter"])
              </li>
              <li>All standard input/textarea/select props</li>
            </ul>
          </div>
        </div>

        {/* Triggers */}
        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            <code className="text-lg">InlineEditable.EditTrigger</code>
          </h3>
          <p className="mb-3" style={{ color: "var(--color-text-muted)" }}>
            Explicit button to enter edit mode. Useful when Preview has{" "}
            <code className="text-sm">{'activationMode={["none"]}'}</code>.
          </p>
        </div>

        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            <code className="text-lg">InlineEditable.SaveTrigger</code>
          </h3>
          <p className="mb-3" style={{ color: "var(--color-text-muted)" }}>
            Button to save changes and exit edit mode. Only visible when{" "}
            <code className="text-sm">isEditing</code> is true.
          </p>
        </div>

        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            <code className="text-lg">InlineEditable.CancelTrigger</code>
          </h3>
          <p className="mb-3" style={{ color: "var(--color-text-muted)" }}>
            Button to cancel changes and exit edit mode. Only visible when{" "}
            <code className="text-sm">isEditing</code> is true.
          </p>
        </div>

        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            <code className="text-lg">InlineEditable.Controls</code>
          </h3>
          <p className="mb-3" style={{ color: "var(--color-text-muted)" }}>
            Layout wrapper for grouping Save/Cancel triggers. Accepts{" "}
            <code className="text-sm">className</code> and{" "}
            <code className="text-sm">style</code> props.
          </p>
        </div>

        {/* Types */}
        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            Types
          </h3>
          <div className="space-y-3">
            <div>
              <code className="text-sm">ActivationMode</code> ={" "}
              <code className="text-sm">
                "click" | "dblclick" | "enter" | "none"
              </code>
            </div>
            <div>
              <code className="text-sm">DeactivationMode</code> ={" "}
              <code className="text-sm">
                "blur" | "esc" | "enter" | "cmd+enter" | "none"
              </code>
            </div>
            <div>
              <code className="text-sm">InlineEditHelpers</code> ={" "}
              <code className="text-sm">
                {"{ exitWriteMode: () => void, cancel: () => void }"}
              </code>{" "}
              - Helper methods passed to onSave callback
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
