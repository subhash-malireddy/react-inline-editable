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
      <InlineEditable
        onSave={(newValue) => {
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
