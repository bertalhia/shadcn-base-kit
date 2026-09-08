"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Asks before something that is hard to undo.
 *
 * AlertDialog on a pointer, drawer on a phone. The confirm label should name
 * the action — "Delete project" beats "OK", because a person who skimmed the
 * question can still tell what the button does.
 *
 * `onConfirm` may return a promise; the dialog stays open and shows a spinner
 * until it settles, so a failed request does not silently close the dialog.
 *
 * `AlertDialogAction` in this style is a plain `Button` — unlike the Radix
 * part of the same name, it does not close anything — so the open state has to
 * be driven from the root. Passing `open` hands that to the caller; leaving it
 * off makes the dialog own it, which is what a bare `trigger` needs.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactElement;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void | Promise<void>;
}) {
  const isMobile = useIsMobile();
  const [pending, setPending] = React.useState(false);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const handleConfirm = React.useCallback(async () => {
    setPending(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setPending(false);
    }
  }, [onConfirm, setOpen]);

  const confirmContent = (
    <>
      {pending ? <Spinner /> : null}
      {confirmLabel}
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setOpen}>
        {trigger ? <DrawerTrigger render={trigger} /> : null}
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description ? (
              <DrawerDescription>{description}</DrawerDescription>
            ) : null}
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant={destructive ? "destructive" : "default"}
              disabled={pending}
              onClick={handleConfirm}
            >
              {confirmContent}
            </Button>
            <DrawerClose render={<Button variant="outline" />}>
              {cancelLabel}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      {trigger ? <AlertDialogTrigger render={trigger} /> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={destructive ? "destructive" : "default"}
            disabled={pending}
            onClick={() => {
              void handleConfirm();
            }}
          >
            {confirmContent}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
