import { InlineEditable } from "@/index";
import { useState } from "react";

export function DoubleClickMode() {
  const [value, setValue] = useState("Double-click to edit this text");

  return (
    <div>
      <h3>Double Click Mode</h3>
      <p>
        Use <code>activationMode={["dblclick", "enter"]}</code> to require
        double-click. Prevents accidental activation while keeping keyboard
        accessibility.
      </p>
      <div className="example-interactive">
        <InlineEditable onSave={() => console.log("Saved:", value)}>
          <InlineEditable.Preview activationMode={["dblclick", "enter"]}>
            {value}
          </InlineEditable.Preview>
          <InlineEditable.Write
            name="dblclick-text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </InlineEditable>
      </div>
    </div>
  );
}
