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
  DeactivationMode,
  TriggerElement,
  TriggerProps,
  ControlsWrapperProps,
} from "./types";

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
  const { isEditing, enterWriteMode } = useInlineEditContext();

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
    computedProps.onClick = composeHandler(onClick, enterWriteMode);
  } else {
    computedProps.onClick = onClick;
  }

  if (modes.has("dblclick")) {
    computedProps.onDoubleClick = composeHandler(onDoubleClick, enterWriteMode);
  } else {
    computedProps.onDoubleClick = onDoubleClick;
  }

  if (modes.has("enter")) {
    computedProps.onKeyDown = (e: KeyboardEvent) => {
      onKeyDown?.(e);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enterWriteMode();
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
 * Displays the editable input when in write mode.
 * Polymorphic - defaults to `<input>`, use `as` prop to change.
 * Auto-focuses on mount via callback ref.
 *
 * Supports both controlled and uncontrolled patterns:
 * - Controlled: pass `value` + `onChange` for real-time access
 * - Uncontrolled: pass `defaultValue` (optional), value read from DOM on save
 *
 * Default deactivation modes are component-aware:
 * - input/select: ["blur", "esc", "enter"] - Enter saves
 * - textarea: ["blur", "esc", "cmd+enter"] - Cmd/Ctrl+Enter saves (Enter = newline)
 *
 * @example
 * // Controlled
 * <InlineEditable.Write
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 *
 * // Uncontrolled
 * <InlineEditable.Write defaultValue="Initial text" />
 */
const DEFAULT_DEACTIVATION_MODES_INPUT: DeactivationMode[] = [
  "blur",
  "esc",
  "enter",
];
const DEFAULT_DEACTIVATION_MODES_TEXTAREA: DeactivationMode[] = [
  "blur",
  "esc",
  "cmd+enter",
];

function Write<T extends EditElement = "input">({
  as,
  value,
  onChange,
  defaultValue,
  onKeyDown,
  onBlur,
  deactivationMode,
  ...props
}: InlineEditWriteProps<T>) {
  const { isEditing, save, cancel, setInputRef } = useInlineEditContext();

  const Component = as || "input";
  const isTextarea = Component === "textarea";

  // Use component-aware defaults if not specified
  const resolvedModes =
    deactivationMode ??
    (isTextarea
      ? DEFAULT_DEACTIVATION_MODES_TEXTAREA
      : DEFAULT_DEACTIVATION_MODES_INPUT);
  const modes = new Set(resolvedModes);

  // Callback ref for auto-focus and connecting to context
  const refCallback = (
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  ) => {
    setInputRef(element);
    if (element) {
      element.focus();
    }
  };

  if (!isEditing) {
    return null;
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    (onKeyDown as ((e: KeyboardEvent) => void) | undefined)?.(e);

    if (modes.has("esc") && e.key === "Escape") {
      cancel();
      return;
    }

    if (e.key === "Enter") {
      // Cmd/Ctrl+Enter always saves if mode is enabled
      if (modes.has("cmd+enter") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        save();
        return;
      }

      // Plain Enter saves if mode is enabled (not for textarea typically)
      if (modes.has("enter") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        save();
        return;
      }
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    (onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
    if (modes.has("blur")) {
      save();
    }
  };

  // Build value props based on controlled vs uncontrolled mode
  const isControlled = value !== undefined;
  const valueProps = isControlled ? { value, onChange } : { defaultValue };

  return createElement(Component as ElementType, {
    ...props,
    ...valueProps,
    ref: refCallback,
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
  });
}

// ============================================================================
// InlineEditable.EditTrigger
// ============================================================================

/**
 * Explicit trigger to enter edit mode.
 * Polymorphic - defaults to `<button>`, use `as` prop to change.
 * Only visible when NOT in edit mode.
 *
 * @example
 * <InlineEditable.EditTrigger>Edit</InlineEditable.EditTrigger>
 */
function EditTrigger<T extends TriggerElement = "button">({
  as,
  children,
  onClick,
  ...props
}: TriggerProps<T>) {
  const { isEditing, enterWriteMode } = useInlineEditContext();

  if (isEditing) {
    return null;
  }

  const Component = as || "button";

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    enterWriteMode();
  };

  return createElement(
    Component as ElementType,
    { ...props, onClick: handleClick },
    children
  );
}

// ============================================================================
// InlineEditable.SaveTrigger
// ============================================================================

/**
 * Trigger to save changes and exit write mode.
 * Polymorphic - defaults to `<button>`, use `as` prop to change.
 * Only visible when in write mode.
 *
 * @example
 * <InlineEditable.SaveTrigger>Save</InlineEditable.SaveTrigger>
 */
function SaveTrigger<T extends TriggerElement = "button">({
  as,
  children,
  onClick,
  ...props
}: TriggerProps<T>) {
  const { isEditing, save } = useInlineEditContext();

  if (!isEditing) {
    return null;
  }

  const Component = as || "button";

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    save();
  };

  return createElement(
    Component as ElementType,
    { ...props, onClick: handleClick },
    children
  );
}

// ============================================================================
// InlineEditable.CancelTrigger
// ============================================================================

/**
 * Trigger to revert changes and exit edit mode.
 * Polymorphic - defaults to `<button>`, use `as` prop to change.
 * Only visible when in edit mode.
 *
 * @example
 * <InlineEditable.CancelTrigger>Cancel</InlineEditable.CancelTrigger>
 */
function CancelTrigger<T extends TriggerElement = "button">({
  as,
  children,
  onClick,
  ...props
}: TriggerProps<T>) {
  const { isEditing, cancel } = useInlineEditContext();

  if (!isEditing) {
    return null;
  }

  const Component = as || "button";

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    cancel();
  };

  return createElement(
    Component as ElementType,
    { ...props, onClick: handleClick },
    children
  );
}

// ============================================================================
// InlineEditable.Controls
// ============================================================================

/**
 * Layout wrapper for grouping Submit/Cancel triggers.
 * Only visible when in edit mode.
 *
 * @example
 * <InlineEditable.Controls className="flex gap-2">
 *   <InlineEditable.SubmitTrigger>Save</InlineEditable.SubmitTrigger>
 *   <InlineEditable.CancelTrigger>Cancel</InlineEditable.CancelTrigger>
 * </InlineEditable.Controls>
 */
function ControlsWrapper({ children, className, style }: ControlsWrapperProps) {
  const { isEditing } = useInlineEditContext();

  if (!isEditing) {
    return null;
  }

  return createElement("div", { className, style }, children);
}

// ============================================================================
// Compound Component Export
// ============================================================================

export const InlineEditable = Object.assign(InlineEditableRoot, {
  Preview,
  Write,
  EditTrigger,
  SaveTrigger,
  CancelTrigger,
  Controls: ControlsWrapper,
});

export default InlineEditable;
