import { InlineEditable } from "@/index";
import { useState } from "react";

// ============================================================================
// 4.2 WithEditTrigger
// ============================================================================
/**
 * Separate edit button using EditTrigger.
 * Preview has activationMode={["none"]} - only the button triggers edit mode.
 */

export function WithEditTrigger() {
  const [value, setValue] = useState("Only the button activates edit mode");

  return (
    <div>
      <h3>With Edit Trigger</h3>
      <p>Click the Edit button to enter edit mode.</p>
      <div className="example-interactive">
        <InlineEditable>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <InlineEditable.Preview activationMode={["none"]}>
              {value}
            </InlineEditable.Preview>
            <InlineEditable.EditTrigger
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
              Edit
            </InlineEditable.EditTrigger>
          </span>
          <InlineEditable.Write
            name="trigger-text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </InlineEditable>
      </div>
    </div>
  );
}
