"use client";

import { toast } from "@/components/ui/toast";

/**
 * The four things a screen says after an action, in one place.
 *
 * Going through here rather than calling `toast.add` directly keeps the type
 * icons consistent, and keeps errors at high priority so they outlive the
 * success messages queued behind them.
 */
export const notify = {
  success(description: string, title?: string) {
    return toast.add({ type: "success", title, description });
  },

  info(description: string, title?: string) {
    return toast.add({ type: "info", title, description });
  },

  warning(description: string, title?: string) {
    return toast.add({ type: "warning", title, description });
  },

  error(description: string, title?: string) {
    return toast.add({
      type: "error",
      title,
      description,
      priority: "high",
    });
  },

  /** An action a person can take back, for the seconds after they did it. */
  undoable(description: string, onUndo: () => void, title?: string) {
    const id = toast.add({
      title,
      description,
      actionProps: {
        children: "Undo",
        onClick() {
          onUndo();
          toast.close(id);
        },
      },
    });
    return id;
  },

  /** One toast that follows an async task from start to outcome. */
  promise<TResult>(
    work: Promise<TResult>,
    messages: {
      loading: string;
      success: string | ((result: TResult) => string);
      error: string;
    },
  ) {
    return toast.promise(work, messages);
  },
};
