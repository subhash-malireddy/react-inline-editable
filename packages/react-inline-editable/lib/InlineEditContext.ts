import { createContext, useContext } from "react";

export interface InlineEditContextValue {
  /** Whether currently in write mode */
  isEditing: boolean;
  /** Enter write mode */
  enterWriteMode: () => void;
  /** Exit write mode (no save/cancel action) */
  exitWriteMode: () => void;
  /** Save changes and exit write mode */
  save: () => void;
  /** Cancel changes and exit write mode */
  cancel: () => void;
  /** Ref callback to attach to the editable input */
  setInputRef: (
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  ) => void;
}

const InlineEditContext = createContext<InlineEditContextValue | null>(null);

/**
 * Hook to access the InlineEdit context.
 * Must be used within an InlineEdit provider.
 *
 * @throws Error if used outside of InlineEdit context
 */
export function useInlineEditContext(): InlineEditContextValue {
  const context = useContext(InlineEditContext);

  if (context === null) {
    throw new Error(
      "useInlineEditContext must be used within an InlineEdit component"
    );
  }

  return context;
}

export { InlineEditContext };
