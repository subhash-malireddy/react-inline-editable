import InlineEditable from "@/components/inline-editable/core/InlineEditable";
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
      <InlineEditable>
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <InlineEditable.Preview activationMode={["none"]}>
            {value}
          </InlineEditable.Preview>
          <InlineEditable.EditTrigger>Edit</InlineEditable.EditTrigger>
        </span>
        <InlineEditable.Write
          name="trigger-text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </InlineEditable>
    </div>
  );
}
