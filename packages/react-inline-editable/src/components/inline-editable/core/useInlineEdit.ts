import { useCallback, useRef, useState } from "react";

export interface UseInlineEditOptions {
  /**
   * Callback when entering write mode.
   * Use cases: focus management, disable other UI elements, track analytics.
   */
  onEnterWriteMode?: () => void;
  /**
   * Callback when exiting write mode (always called, regardless of save/cancel).
   * Use cases: re-enable UI elements, cleanup, restore focus to preview.
   */
  onExitWriteMode?: () => void;
  /** Callback when saving - receives current value from input ref */
  onSave?: (value: string) => void;
  /** Callback when cancelling - use to revert controlled state to previous value */
  onCancel?: () => void;
}

export interface UseInlineEditReturn {
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

/**
 * Hook that manages inline editing state.
 * Supports both controlled and uncontrolled inputs.
 *
 * @example
 * const { isEditing, enterWriteMode, save, cancel, setInputRef } = useInlineEdit({
 *   onSave: (value) => console.log('Saved:', value),
 *   onCancel: () => console.log('Cancelled'),
 * });
 */
export function useInlineEdit(
  options: UseInlineEditOptions = {}
): UseInlineEditReturn {
  const { onEnterWriteMode, onExitWriteMode, onSave, onCancel } = options;

  const [isEditing, setIsEditing] = useState(false);
  const inputElementRef = useRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  >(null);

  const setInputRef = useCallback(
    (
      element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
    ) => {
      inputElementRef.current = element;
    },
    []
  );

  const enterWriteMode = useCallback(() => {
    setIsEditing(true);
    onEnterWriteMode?.();
  }, [onEnterWriteMode]);

  const exitWriteMode = useCallback(() => {
    setIsEditing(false);
    onExitWriteMode?.();
  }, [onExitWriteMode]);

  const save = useCallback(() => {
    const value = inputElementRef.current?.value ?? "";
    onSave?.(value);
    exitWriteMode();
  }, [onSave, exitWriteMode]);

  const cancel = useCallback(() => {
    onCancel?.();
    exitWriteMode();
  }, [onCancel, exitWriteMode]);

  return {
    isEditing,
    enterWriteMode,
    exitWriteMode,
    save,
    cancel,
    setInputRef,
  };
}
