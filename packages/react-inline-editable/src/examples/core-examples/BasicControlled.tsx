import { useState } from "react";
import { InlineEditable } from "@/index";

// ============================================================================
// 4.1 BasicControlled
// ============================================================================

/**
 * Simple controlled input with useState.
 * Uses default activation (click + enter).
 */
export function BasicControlled() {
  const [value, setValue] = useState("Click to edit this text");

  return (
    <div>
      <h3>Basic Controlled</h3>
      <p>Default activation: click or press Enter/Space when focused.</p>
      <InlineEditable>
        <InlineEditable.Preview>{value}</InlineEditable.Preview>
        <InlineEditable.Write
          name="basic-text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </InlineEditable>
    </div>
  );
}
