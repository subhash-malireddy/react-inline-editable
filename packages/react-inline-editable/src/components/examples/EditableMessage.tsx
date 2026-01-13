import { InlineEditable } from "@/index";
import { useState } from "react";

// Simple inline SVG icons (no external dependencies)
const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function CustomStyling() {
  const [message, setMessage] = useState(
    "This is like the Claude web app edit feature.\n\nHover to see the edit icon, click to edit your message."
  );

  return (
    <div>
      <h3>Custom Styling</h3>
      <p>
        Demonstrates custom styling with layout stability and icon buttons.
        Hover or focus to reveal edit icon (tabbable). Uses{" "}
        <code>{'activationMode={["none"]}'}</code> so only the EditTrigger
        activates edit mode.
      </p>

      <div className="example-interactive">
        <div
          className="group relative p-3 px-4 rounded-xl max-w-[600px] min-h-12"
          style={{
            backgroundColor: "var(--color-cream-dark)",
          }}
        >
          <InlineEditable
            onSave={(newValue, _helpers) => {
              console.log("Message updated:", newValue);
              setMessage(newValue);
            }}
          >
            <InlineEditable.Preview
              activationMode={["none"]}
              className="block whitespace-pre-wrap leading-relaxed"
            >
              {message}
            </InlineEditable.Preview>

            <InlineEditable.EditTrigger
              className="absolute top-2 right-2 p-1 bg-transparent border-none cursor-pointer rounded
                       opacity-0 transition-opacity duration-150
                       group-hover:opacity-60 group-focus-within:opacity-60
                       hover:opacity-100 hover:bg-black/5
                       focus:opacity-100 focus:bg-black/5"
              title="Edit message"
            >
              <EditIcon />
            </InlineEditable.EditTrigger>

            <InlineEditable.Write
              as="textarea"
              defaultValue={message}
              deactivationMode={["none"]}
              onFocus={(e) => {
                // Position cursor at end
                const len = e.target.value.length;
                e.target.selectionStart = e.target.selectionEnd = len;
              }}
              className="box-border w-full min-h-20 p-2 border border-gray-300 rounded-lg
                       outline-none bg-white resize-y font-[inherit] text-inherit leading-relaxed"
              name="editable-message"
              rows={4}
              style={{ width: "100%", resize: "vertical" }}
            />

            <InlineEditable.Controls className="flex gap-2 mt-3 justify-end">
              <InlineEditable.CancelTrigger
                className="flex items-center gap-1 px-3 py-1.5 border-none rounded-md
                         cursor-pointer text-sm bg-gray-200 text-gray-700
                         hover:bg-gray-300 transition-colors"
              >
                <XIcon /> Cancel
              </InlineEditable.CancelTrigger>
              <InlineEditable.SaveTrigger
                className="flex items-center gap-1 px-3 py-1.5 border-none rounded-md
                         cursor-pointer text-sm bg-text text-white
                         hover:bg-text/80 transition-colors"
              >
                <CheckIcon /> Save
              </InlineEditable.SaveTrigger>
            </InlineEditable.Controls>
          </InlineEditable>
        </div>
      </div>
    </div>
  );
}
