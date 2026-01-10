import { InlineEditable } from "@/index";
import { useState } from "react";

export function WithExplicitControls() {
  const [value, setValue] = useState("Click to edit this text");
  return (
    <div>
      <h3>With Explicit Controls</h3>
      <p>
        Use explicit Save and Cancel buttons. Blur and Escape do not exit write
        mode.
      </p>
      <InlineEditable
        onSave={() => console.log("Saved:", value)}
        onCancel={() => console.log("Cancelled")}
        onEnterWriteMode={() => {
          alert("check in console");
          console.log("Entered write mode");
        }}
        onExitWriteMode={() => console.log("Exited write mode")}
      >
        <InlineEditable.Preview>{value}</InlineEditable.Preview>
        <InlineEditable.Write
          name="explicit-controls-text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          deactivationMode={["none"]}
        />
        <InlineEditable.SaveTrigger>Save</InlineEditable.SaveTrigger>
        <InlineEditable.CancelTrigger>Cancel</InlineEditable.CancelTrigger>
      </InlineEditable>
    </div>
  );
}
