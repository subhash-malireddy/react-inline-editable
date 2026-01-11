import { InlineEditable } from "@/index";
import { useState } from "react";

export function BasicUncontrolled() {
  // Only track the committed value for display
  const [displayValue, setDisplayValue] = useState(
    "Click to edit (uncontrolled)"
  );

  return (
    <div>
      <h3>Basic Uncontrolled</h3>
      <p>
        No <code>value</code> or <code>onChange</code> needed. The value is read
        from the DOM on save via <code>onSave</code> callback.
      </p>
      <InlineEditable
        onSave={(newValue) => {
          console.log("Saved:", newValue);
          setDisplayValue(newValue);
        }}
      >
        <InlineEditable.Preview>{displayValue}</InlineEditable.Preview>
        <InlineEditable.Write defaultValue={displayValue} />
      </InlineEditable>
    </div>
  );
}
