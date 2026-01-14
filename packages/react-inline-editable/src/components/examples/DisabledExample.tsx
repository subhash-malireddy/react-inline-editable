import { useState } from "react";
import { InlineEditable } from "@/index";

/**
 * Example demonstrating the isDisabled prop.
 * When disabled, the inline edit becomes un-interactive and cannot enter edit mode.
 */
export function DisabledExample() {
  const [value, setValue] = useState("This text cannot be edited");
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div>
      <h3>Disabled State</h3>
      <p>
        Use <code>isDisabled</code> prop to prevent editing. When disabled, all
        activation methods (click, double-click, keyboard) are disabled and the
        component becomes un-interactive.
      </p>

      <div className="example-interactive">
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
              style={{ width: "unset" }}
            />
            <span>Disable editing</span>
          </label>
        </div>

        <InlineEditable
          isDisabled={isDisabled}
          onSave={(newValue) => {
            console.log("Saved:", newValue);
            setValue(newValue);
          }}
        >
          <InlineEditable.Preview
            style={{
              opacity: isDisabled ? 0.6 : 1,
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          >
            {value}
          </InlineEditable.Preview>
          <InlineEditable.Write
            name="disabled-text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </InlineEditable>
      </div>
    </div>
  );
}
