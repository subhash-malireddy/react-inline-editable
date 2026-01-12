import { InlineEditable } from "@/index";
import { useRef, useState } from "react";

export function WithExplicitControls() {
  const [value, setValue] = useState("Click to edit this text");
  const prevValue = useRef(value);
  return (
    <div>
      <h3>With Explicit Controls</h3>
      <p>
        Use explicit Save and Cancel buttons. Blur and Escape do not exit write
        mode.
      </p>
      <div className="example-interactive">
        <InlineEditable
          onSave={(newValue, _helpers) => {
            console.log("Saved:", newValue);
            prevValue.current = newValue;
          }}
          onCancel={() => {
            console.log("Cancelled");
            setValue(prevValue.current);
          }}
          onEnterWriteMode={() => {
            console.log("Entered write mode");
          }}
          onExitWriteMode={() => console.log("Exited write mode")}
        >
          <InlineEditable.Preview>{value}</InlineEditable.Preview>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <InlineEditable.Write
              name="explicit-controls-text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              deactivationMode={["none"]}
            />
            <InlineEditable.Controls style={{ display: "flex", gap: "0.5rem" }}>
              <InlineEditable.CancelTrigger
                className="px-3 py-1.5 border-none rounded-md cursor-pointer text-sm transition-colors"
                style={{
                  backgroundColor: "var(--color-cream-dark)",
                  color: "var(--color-text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-rust)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-cream-dark)";
                  e.currentTarget.style.color = "var(--color-text)";
                }}
              >
                Cancel
              </InlineEditable.CancelTrigger>
              <InlineEditable.SaveTrigger
                className="px-3 py-1.5 border-none rounded-md cursor-pointer text-sm transition-colors"
                style={{
                  backgroundColor: "var(--color-rust-dark)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-rust)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-rust-dark)";
                }}
              >
                Save
              </InlineEditable.SaveTrigger>
            </InlineEditable.Controls>
          </div>
        </InlineEditable>
      </div>
    </div>
  );
}
