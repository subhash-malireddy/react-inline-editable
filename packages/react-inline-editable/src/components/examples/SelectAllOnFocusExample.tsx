import { useState } from "react";
import { InlineEditable } from "@/index";

/**
 * Example demonstrating the selectAllOnFocus prop.
 * When enabled, all text is automatically selected when entering edit mode.
 */
export function SelectAllOnFocusExample() {
  const [value1, setValue1] = useState("Select all on focus - click to edit");
  const [value2, setValue2] = useState("Normal focus - click to edit");

  return (
    <div>
      <h3>Select All On Focus</h3>
      <p>
        Use <code>selectAllOnFocus</code> prop to automatically select all text
        when entering edit mode. Useful for quick replacement of existing values.
      </p>

      <div className="example-interactive">
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            With selectAllOnFocus:
          </p>
          <InlineEditable
            selectAllOnFocus={true}
            onSave={(newValue) => {
              console.log("Saved (select all):", newValue);
              setValue1(newValue);
            }}
          >
            <InlineEditable.Preview>
              {value1}
            </InlineEditable.Preview>
            <InlineEditable.Write
              name="select-all-text"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
          </InlineEditable>
        </div>

        <div>
          <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            Without selectAllOnFocus (default):
          </p>
          <InlineEditable
            onSave={(newValue) => {
              console.log("Saved (normal):", newValue);
              setValue2(newValue);
            }}
          >
            <InlineEditable.Preview>
              {value2}
            </InlineEditable.Preview>
            <InlineEditable.Write
              name="normal-text"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
          </InlineEditable>
        </div>
      </div>
    </div>
  );
}
