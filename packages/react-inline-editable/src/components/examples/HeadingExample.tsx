import { InlineEditable } from "@/index";
import { useState } from "react";

export function HeadingExample() {
  const [title, setTitle] = useState("Click to edit this heading");

  return (
    <div>
      <h3>Heading Example</h3>
      <p>
        Use <code>as="h1"</code> on Preview to render an editable heading. The
        input replaces the heading when editing.
      </p>
      <div className="example-interactive">
        <InlineEditable
          onSave={(_, _helpers) => console.log("Heading saved:", title)}
        >
          <InlineEditable.Preview
            as="h4"
            style={{ margin: 0, fontSize: "1em", fontFamily: "sans-serif" }}
          >
            {title}
          </InlineEditable.Preview>
          <InlineEditable.Write
            name="heading-text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              fontSize: "1em",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              padding: 0,
            }}
          />
        </InlineEditable>
      </div>
    </div>
  );
}
