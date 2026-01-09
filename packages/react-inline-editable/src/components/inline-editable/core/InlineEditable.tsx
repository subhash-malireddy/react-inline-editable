import {
  createElement,
  type ElementType,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { InlineEditContext, useInlineEditContext } from "./InlineEditContext";
import { useInlineEdit, type UseInlineEditOptions } from "./useInlineEdit";
import type {
  InlineEditPreviewProps,
  InlineEditWriteProps,
  PreviewElement,
  EditElement,
  ActivationMode,
} from "../types";

// ============================================================================
// InlineEditable Provider
// ============================================================================

export interface InlineEditableProps extends UseInlineEditOptions {
  children: ReactNode;
}

/**
 * Provider component for inline editing.
 * Renders children directly (no wrapper DOM element).
 *
 * @example
 * <InlineEditable>
 *   <InlineEditable.Preview>{value}</InlineEditable.Preview>
 *   <InlineEditable.Write value={value} onChange={handleChange} />
 * </InlineEdit>
 */
function InlineEditableRoot({ children, ...options }: InlineEditableProps) {
  const editState = useInlineEdit(options);

  return (
    <InlineEditContext.Provider value={editState}>
      {children}
    </InlineEditContext.Provider>
  );
}

// ============================================================================
// InlineEditable.Preview
// ============================================================================

/**
 * Displays content when not in edit mode.
 * Polymorphic - defaults to `<span>`, use `as` prop to change.
 *
 * @example
 * <InlineEditable.Preview as="h1" className="title">
 *   {value}
 * </InlineEditable.Preview>
 */
const DEFAULT_ACTIVATION_MODES: ActivationMode[] = ["click", "enter"];

function Preview<T extends PreviewElement = "span">({
  as,
  children,
  activationMode = DEFAULT_ACTIVATION_MODES,
  ...props
}: InlineEditPreviewProps<T>) {
  const { isEditing, startEditing } = useInlineEditContext();

  if (isEditing) {
    return null;
  }

  const Component = as || "span";
  const modes = new Set(activationMode);

  // Helper to compose user handler with our handler
  const composeHandler = <E,>(
    userHandler: ((e: E) => void) | undefined,
    externalHandler: () => void
  ) => {
    return (e: E) => {
      userHandler?.(e);
      externalHandler();
    };
  };

  // Build props based on activation modes
  const { onClick, onDoubleClick, onKeyDown, tabIndex, ...restProps } = props;
  const computedProps: Record<string, unknown> = { ...restProps };

  if (modes.has("click")) {
    computedProps.onClick = composeHandler(onClick, startEditing);
  } else {
    computedProps.onClick = onClick;
  }

  if (modes.has("dblclick")) {
    computedProps.onDoubleClick = composeHandler(onDoubleClick, startEditing);
  } else {
    computedProps.onDoubleClick = onDoubleClick;
  }

  if (modes.has("enter")) {
    computedProps.onKeyDown = (e: KeyboardEvent) => {
      onKeyDown?.(e);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startEditing();
      }
    };
    // Make focusable for keyboard navigation
    computedProps.tabIndex = tabIndex ?? 0;
  } else {
    computedProps.onKeyDown = onKeyDown;
    computedProps.tabIndex = tabIndex;
  }

  return createElement(Component as ElementType, computedProps, children);
}

// ============================================================================
// InlineEditable.Write
// ============================================================================

/**
 * Displays the editable input when in edit mode.
 * Polymorphic - defaults to `<input>`, use `as` prop to change.
 * Auto-focuses on mount via callback ref.
 *
 * @example
 * <InlineEditable.Write
 *   as="textarea"
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   rows={3}
 * />
 */
function Write<T extends EditElement = "input">({
  as,
  value,
  onChange,
  ...props
}: InlineEditWriteProps<T>) {
  const { isEditing, stopEditing } = useInlineEditContext();

  // Callback ref for auto-focus
  const autoFocusRef = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  };

  if (!isEditing) {
    return null;
  }

  const Component = as || "input";

  return createElement(Component as ElementType, {
    ...props,
    ref: autoFocusRef,
    value,
    onChange,
    onBlur: stopEditing,
  });
}

// ============================================================================
// Compound Component Export
// ============================================================================

export const InlineEditable = Object.assign(InlineEditableRoot, {
  Preview,
  Write,
});

export default InlineEditable;
