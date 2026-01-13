import { createContext, useContext } from "react";
import type { UseInlineEditReturn } from "./useInlineEdit";

export type InlineEditContextValue = UseInlineEditReturn;

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
