import { createContext, useContext, type RefObject } from "react";

export interface InlineEditContextValue {
  /** Whether currently in edit mode */
  isEditing: boolean;
  /** Enter edit mode */
  startEditing: () => void;
  /** Exit edit mode */
  stopEditing: () => void;
  /** Submit changes and exit edit mode */
  submit: () => void;
  /** Cancel changes and exit edit mode */
  cancel: () => void;
  /** Ref to attach to the editable input for focus management */
  inputRef: RefObject<HTMLElement | null>;
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
