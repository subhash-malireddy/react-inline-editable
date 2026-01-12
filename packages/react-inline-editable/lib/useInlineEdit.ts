import { useCallback, useRef, useState } from "react";

export interface InlineEditHelpers {
  /** Exit write mode programmatically (useful for error handling) */
  exitWriteMode: () => void;
  /** Cancel changes and exit write mode */
  cancel: () => void;
}

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
  /**
   * Callback when saving - receives current value from input ref and helper methods.
   * Supports both sync and async.
   *
   * @example
   * onSave: async (value, { exitWriteMode }) => {
   *   try {
   *     await saveToServer(value);
   *   } catch (error) {
   *     showToast("Failed to save");
   *     exitWriteMode(); // Exit on error
   *   }
   * }
   */
  onSave?: (value: string, helpers: InlineEditHelpers) => void | Promise<void>;
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
  save: () => void | Promise<void>;
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
 *   onSave: (value, { exitWriteMode }) => {
 *     console.log('Saved:', value);
 *     // Can use exitWriteMode() for programmatic exit on error
 *   },
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

  const cancel = useCallback(() => {
    onCancel?.();
    exitWriteMode();
  }, [onCancel, exitWriteMode]);

  const save = useCallback(async () => {
    const value = inputElementRef.current?.value ?? "";
    const helpers: InlineEditHelpers = {
      exitWriteMode,
      cancel,
    };
    const result = Promise.resolve(onSave?.(value, helpers)); // Handles both sync and async
    await result;
    // Only exit if save succeeded (no error thrown)
    exitWriteMode();
  }, [onSave, exitWriteMode, cancel]);

  return {
    isEditing,
    enterWriteMode,
    exitWriteMode,
    save,
    cancel,
    setInputRef,
  };
}
