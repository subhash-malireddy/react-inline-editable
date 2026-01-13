import { InlineEditable } from "@/index";
import { useState } from "react";

/**
 * Example demonstrating async onSave with loading states and error handling.
 *
 * Key points:
 * - Consumers manage their own loading states (we use useState here, but you could use
 *   TanStack Query's useMutation.isPending, React's useActionState.pending, etc.)
 * - The library doesn't expose internal isSaving state to keep the API minimal
 * - onSave supports both sync and async functions
 * - On error, component stays in edit mode by default (allows retry)
 * - Consumers can programmatically exit using exitWriteMode() if needed
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

export function AsyncSaveExample() {
  const [value, setValue] = useState(
    "Click to edit (remove 'error' from the value to successfully save)"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pattern 1: Default error handling - stay in edit mode
  const handleSave = async (
    newValue: string,
    _helpers: { exitWriteMode: () => void }
  ) => {
    setIsSaving(true);
    setError(null);

    try {
      await saveToServer(newValue);
      setValue(newValue);
      // Component will exit edit mode automatically on success
    } catch (err) {
      // Stay in edit mode on error - user can retry or cancel
      setError(err instanceof Error ? err.message : "Failed to save");
      throw err; // Re-throw so component knows to stay in edit mode
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h3>Async Save with Loading States</h3>
      <p>
        Demonstrates async <code>onSave</code> with consumer-managed loading
        states. The input and save button are disabled during save. On error,
        the component stays in edit mode so the user can retry.
      </p>
      <div className="example-interactive">
        <InlineEditable
          onSave={handleSave}
          onCancel={() => {
            setError(null);
          }}
        >
          <InlineEditable.Preview>{value}</InlineEditable.Preview>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div>
              <InlineEditable.Write
                name="async-save-text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(null); // Clear error on input change
                }}
                disabled={isSaving}
                deactivationMode={["none"]}
                style={{
                  opacity: isSaving ? 0.6 : 1,
                  cursor: isSaving ? "not-allowed" : "text",
                }}
              />
              {error && (
                <div
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.875rem",
                    color: "var(--color-rust)",
                  }}
                >
                  {error}
                </div>
              )}
            </div>
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
