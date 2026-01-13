import { InlineEditable } from "@/index";
import { useState } from "react";

export function TextareaExample() {
  const [value, setValue] = useState(
    "This is a multi-line text.\nClick to edit.\nPress Cmd/Ctrl+Enter to save."
  );

  return (
    <div>
      <h3>Textarea Example</h3>
      <p>
        Use <code>as="textarea"</code> on Write for multi-line editing. Enter
        inserts newlines, Cmd/Ctrl+Enter saves.
      </p>
      <div className="example-interactive">
        <InlineEditable
          onSave={(_, _helpers) => console.log("Saved:", value)}
        >
          <InlineEditable.Preview
            style={{ whiteSpace: "pre-wrap", display: "block" }}
          >
            {value}
          </InlineEditable.Preview>
          <InlineEditable.Write
            as="textarea"
            name="textarea-text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            style={{ width: "100%", resize: "vertical" }}
          />
        </InlineEditable>
      </div>
    </div>
  );
}
