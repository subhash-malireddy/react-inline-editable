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
export type EditElement = ElementType;

export interface InlineEditPreviewBaseProps {
  children: ReactNode;
  /** How the user enters edit mode. Default: "focus" */
  activationMode?: "focus" | "click" | "dblclick";
}

export interface InlineEditWriteBaseProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLElement>) => void;
  /** Maximum number of characters allowed */
  maxLength?: number;
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
  InlineEditWriteBaseProps & PolymorphicProps<T>;
