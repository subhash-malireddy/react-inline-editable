import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * Use the `as` prop to render as any HTML element.
 * TypeScript will narrow props based on the element type.
 *
 * @example
 * <Component as="h1" className="title" /> // h1-specific props available
 * <Component as="textarea" rows={5} />    // textarea-specific props available
 */
export type PolymorphicProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export type PreviewElement = ElementType;

/**
 * Elements that support the change event.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
 */
export type EditElement = "input" | "select" | "textarea";

/**
 * Available activation modes for entering write mode.
 * - "click": Single click to edit
 * - "dblclick": Double click to edit
 * - "enter": Enter/Space key to edit (keyboard accessible)
 * - "none": No automatic activation (programmatic control only)
 */
export const ACTIVATION_MODES = ["click", "dblclick", "enter", "none"] as const;
export type ActivationMode = (typeof ACTIVATION_MODES)[number];

/**
 * Available deactivation modes for exiting write mode.
 * - "blur": Blur triggers save() and exits
 * - "esc": Escape key triggers cancel() and exits
 * - "enter": Enter key triggers save() and exits (recommended for inputs)
 * - "cmd+enter": Cmd/Ctrl+Enter triggers save() and exits (recommended for textareas)
 * - "none": No automatic deactivation (must use SaveTrigger/CancelTrigger)
 */
export const DEACTIVATION_MODES = [
  "blur",
  "esc",
  "enter",
  "cmd+enter",
  "none",
] as const;
export type DeactivationMode = (typeof DEACTIVATION_MODES)[number];

export interface InlineEditPreviewBaseProps {
  children: ReactNode;
  /** How the user enters edit mode. Default: ["click", "enter"] */
  activationMode?: ActivationMode[];
}

/**
 * Maps edit element tags to their corresponding HTML element types.
 */
type EditElementMap = {
  input: HTMLInputElement;
  select: HTMLSelectElement;
  textarea: HTMLTextAreaElement;
};

export interface InlineEditWriteBaseProps<T extends EditElement = "input"> {
  value: string;
  onChange: (event: React.ChangeEvent<EditElementMap[T]>) => void;
  /**
   * How the user exits write mode.
   * Default for input/select: ["blur", "esc", "enter"]
   * Default for textarea: ["blur", "esc", "cmd+enter"]
   */
  deactivationMode?: DeactivationMode[];
}

/**
 * Props for InlineEdit.Preview component.
 * Defaults to rendering as `<span>`. Use `as` prop to change element type.
 */
export type InlineEditPreviewProps<T extends PreviewElement = "span"> =
  InlineEditPreviewBaseProps & PolymorphicProps<T>;

/**
 * Props for InlineEdit.Write component.
 * Defaults to rendering as `<input>`. Use `as` prop to change element type.
 */
export type InlineEditWriteProps<T extends EditElement = "input"> =
  InlineEditWriteBaseProps<T> & PolymorphicProps<T>;

export type TriggerElement = ElementType;

/**
 * Props for trigger components (EditTrigger, SubmitTrigger, CancelTrigger).
 * Defaults to rendering as `<button>`. Use `as` prop to change element type.
 */
export type TriggerProps<T extends TriggerElement = "button"> = {
  children: ReactNode;
} & PolymorphicProps<T>;

/**
 * Props for InlineEdit.Controls component.
 * Simple wrapper for grouping triggers.
 */
export interface ControlsWrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
