import {
  useCallback,
  useRef,
  useState,
  type RefObject,
  useEffect,
} from "react";

export interface InlineEditHelpers {
  /** Exit write mode programmatically (useful for error handling) */
  exitWriteMode: () => void;
}

export interface UseInlineEditOptions {
  /** Whether to start in edit mode */
  defaultIsEditing?: boolean;
  /** Whether to select all text on focus */
  selectAllOnFocus?: boolean;
  /** Whether the inline edit is disabled (prevents entering edit mode and makes it un-interactive) */
  isDisabled?: boolean;
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
   * If this function throws an error, the component will remain in edit mode,
   * allowing the user to retry or cancel. The error will propagate to the caller.
   *
   * @param value - Current value from the input element
   * @param helpers - Helper methods including exitWriteMode()
   * @throws Re-throws any error from the save operation
   *
   * @example
   * // Default behavior - auto-exit on success
   * onSave: async (value) => {
   *   await saveToServer(value); // If succeeds, auto-exits edit mode
   * }
   *
   * @example
   * // Stay in edit mode on error (recommended)
   * onSave: async (value) => {
   *   try {
   *     await saveToServer(value);
   *   } catch (error) {
   *     setError(error.message);
   *     throw error; // Re-throw to keep edit mode active
   *   }
   * }
   *
   * @example
   * // Force exit even on error
   * onSave: async (value, { exitWriteMode }) => {
   *   try {
   *     await saveToServer(value);
   *   } catch (error) {
   *     showToast("Failed to save");
   *     exitWriteMode(); // Manually exit despite error
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
  /** Whether the inline edit is disabled */
  isDisabled: boolean;
  /** Enter write mode */
  enterWriteMode: () => void;
  /** Exit write mode (no save/cancel action) */
  exitWriteMode: () => void;
  /** Save changes and exit write mode */
  save: () => Promise<void>;
  /** Cancel changes and exit write mode */
  cancel: () => void;
  /** Ref to the editable input */
  writeRef: RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  >;
  /** Ref to the preview element */
  previewRef: RefObject<HTMLElement | null>;
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
  const {
    defaultIsEditing = false,
    selectAllOnFocus = false,
    isDisabled = false,
    onEnterWriteMode,
    onExitWriteMode,
    onSave,
    onCancel,
  } = options;

  const [isEditing, setIsEditing] = useState(defaultIsEditing);

  const writeRef = useRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  >(null);
  const previewRef = useRef<HTMLElement | null>(null);

  // Store the element that had focus when entering edit mode
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Auto-focus and optionally select all when entering edit mode
  useEffect(() => {
    if (isEditing && writeRef.current) {
      writeRef.current.focus();

      if (selectAllOnFocus && "select" in writeRef.current) {
        writeRef.current.select();
      }
    }
  }, [isEditing, selectAllOnFocus]);

  const enterWriteMode = useCallback(() => {
    // Don't allow entering edit mode when disabled
    if (isDisabled) {
      return;
    }
    // Store the element that currently has focus
    // This could be Preview, EditTrigger, or something else (programmatic)
    previouslyFocusedElementRef.current =
      document.activeElement as HTMLElement | null;
    setIsEditing(true);
    onEnterWriteMode?.();
  }, [isDisabled, onEnterWriteMode]);

  const exitWriteMode = useCallback(() => {
    setIsEditing(false);
    onExitWriteMode?.();

    // Restore focus based on what was focused when we entered edit mode
    queueMicrotask(() => {
      const previousElement = previouslyFocusedElementRef.current;

      // Try to focus the previously focused element if it still exists
      // This handles EditTrigger (stays in DOM with display:none)
      // and any programmatic cases
      if (previousElement && document.contains(previousElement)) {
        previousElement.focus();
      }
      // Otherwise try Preview if it's focusable (has tabIndex >= 0)
      else if (previewRef.current && previewRef.current.tabIndex >= 0) {
        previewRef.current.focus();
      }
      // Otherwise focus is lost
    });
  }, [onExitWriteMode]);

  const cancel = useCallback(() => {
    onCancel?.();
    exitWriteMode();
  }, [onCancel, exitWriteMode]);

  const save = useCallback(async () => {
    const value = writeRef.current?.value ?? "";
    let hasExited = false;
    const helpers: InlineEditHelpers = {
      exitWriteMode: () => {
        hasExited = true;
        exitWriteMode();
      },
    };

    await Promise.resolve(onSave?.(value, helpers));
    if (!hasExited) {
      exitWriteMode();
    }
  }, [onSave, exitWriteMode]);

  return {
    isEditing,
    isDisabled,
    enterWriteMode,
    exitWriteMode,
    save,
    cancel,
    writeRef,
    previewRef,
  };
}
