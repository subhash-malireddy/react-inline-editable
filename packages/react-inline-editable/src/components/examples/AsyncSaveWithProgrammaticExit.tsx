import { InlineEditable } from "@/index";
import { useState } from "react";

/**
 * Example demonstrating async onSave with programmatic exit on error.
 *
 * This shows an alternative error handling pattern where we exit edit mode
 * programmatically after showing an error (e.g., via toast notification).
 *
 * Key differences from AsyncSaveExample:
 * - On error, stays in edit mode
 * - Uses helpers.exitWriteMode() from onSave callback to programmatically exit edit mode
 */

// Simulate an API call
async function saveToServer(value: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  // Simulate error for certain values
  if (value.toLowerCase().includes("error")) {
    throw new Error("Server error: Invalid value");
  }

  // Simulate success
  console.log("Saved to server:", value);
}

// Simple toast notification simulation
function showToast(message: string) {
  // In a real app, you'd use your toast library (react-hot-toast, sonner, etc.)
  console.log("Toast:", message);
  alert(message); // Simple alert for demo purposes
}

export function AsyncSaveWithProgrammaticExit() {
  const [value, setValue] = useState(
    "Click to edit (remove 'error' from the value to successfully save)"
  );
  const [isSaving, setIsSaving] = useState(false);

  // Pattern 2: Programmatic exit on error using helpers
  const handleSave = async (
    newValue: string,
    helpers: { exitWriteMode: () => void }
  ) => {
    setIsSaving(true);

    try {
      await saveToServer(newValue);
      setValue(newValue);
      // Component will exit edit mode automatically on success
    } catch (err) {
      // Show error notification
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save";
      showToast(errorMessage);

      // Then exit edit mode programmatically using helpers
      helpers.exitWriteMode();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h3>Async Save with Programmatic Exit on Error</h3>
      <p>
        Alternative error handling pattern: on error, show a notification
        (toast) and then programmatically exit edit mode using{" "}
        <code>helpers.exitWriteMode()</code> from the <code>onSave</code>{" "}
        callback. This pattern is useful when you prefer showing errors via a
        toast/notification system rather than inline error messages.
      </p>
      <div className="example-interactive">
        <InlineEditable onSave={handleSave}>
          <InlineEditable.Preview>{value}</InlineEditable.Preview>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <InlineEditable.Write
              name="async-save-programmatic-exit-text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={isSaving}
              deactivationMode={["none"]}
              style={{
                opacity: isSaving ? 0.6 : 1,
                cursor: isSaving ? "not-allowed" : "text",
              }}
            />
            <InlineEditable.Controls style={{ display: "flex", gap: "0.5rem" }}>
              <InlineEditable.CancelTrigger
                className="px-3 py-1.5 border-none rounded-md cursor-pointer text-sm transition-colors"
                style={{
                  backgroundColor: "var(--color-cream-dark)",
                  color: "var(--color-text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-rust)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-cream-dark)";
                  e.currentTarget.style.color = "var(--color-text)";
                }}
              >
                Cancel
              </InlineEditable.CancelTrigger>
              <InlineEditable.SaveTrigger
                className="px-3 py-1.5 border-none rounded-md cursor-pointer text-sm transition-colors"
                disabled={isSaving}
                style={{
                  backgroundColor: isSaving
                    ? "var(--color-cream-dark)"
                    : "var(--color-rust-dark)",
                  color: "white",
                  opacity: isSaving ? 0.6 : 1,
                  cursor: isSaving ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.backgroundColor = "var(--color-rust)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-rust-dark)";
                  }
                }}
              >
                {isSaving ? "Saving..." : "Save"}
              </InlineEditable.SaveTrigger>
            </InlineEditable.Controls>
          </div>
        </InlineEditable>
      </div>
    </div>
  );
}
