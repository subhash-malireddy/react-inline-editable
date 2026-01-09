import { useCallback, useRef, useState } from "react";

export interface UseInlineEditOptions {
  /** Optional callback when entering edit mode */
  onStartEditing?: () => void;
  /** Optional callback when exiting edit mode */
  onStopEditing?: () => void;
  /** Optional callback when submit is triggered */
  onSubmit?: () => void;
  /** Optional callback when cancel is triggered */
  onCancel?: () => void;
}

export interface UseInlineEditReturn {
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
  inputRef: React.RefObject<HTMLElement | null>;
}

/**
 * Hook that manages inline editing state.
 * Consumer controls value - this hook only handles edit mode transitions.
 *
 * @example
 * const { isEditing, startEditing, stopEditing, inputRef } = useInlineEdit();
 */
export function useInlineEdit(
  options: UseInlineEditOptions = {}
): UseInlineEditReturn {
  const { onStartEditing, onStopEditing, onSubmit, onCancel } = options;

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLElement | null>(null);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    onStartEditing?.();
  }, [onStartEditing]);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
    onStopEditing?.();
  }, [onStopEditing]);

  const submit = useCallback(() => {
    onSubmit?.();
    stopEditing();
  }, [onSubmit, stopEditing]);

  const cancel = useCallback(() => {
    onCancel?.();
    stopEditing();
  }, [onCancel, stopEditing]);

  return {
    isEditing,
    startEditing,
    stopEditing,
    submit,
    cancel,
    inputRef,
  };
}
