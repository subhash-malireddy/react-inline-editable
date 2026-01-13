import { useState } from "react";
import { InlineEditable } from "@/index";

/**
 * Example demonstrating the defaultIsEditing prop.
 * When enabled, the component starts in edit mode instead of preview mode.
 */
export function DefaultIsEditingExample() {
  const [value, setValue] = useState("This starts in edit mode");

  return (
    <div>
      <h3>Default Is Editing</h3>
      <p>
        Use <code>defaultIsEditing</code> prop to start the component in edit
        mode. Useful for forms or when you want the input to be immediately
        editable on mount.
      </p>

      <div className="example-interactive">
        <InlineEditable
          defaultIsEditing={true}
          onSave={(newValue) => {
            console.log("Saved:", newValue);
            setValue(newValue);
          }}
        >
          <InlineEditable.Preview>
            {value}
          </InlineEditable.Preview>
          <InlineEditable.Write
            name="default-editing-text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </InlineEditable>
      </div>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
        <strong>Note:</strong> This component starts in edit mode when the page
        loads. Try clicking outside or pressing Escape to exit edit mode.
      </p>
    </div>
  );
}
