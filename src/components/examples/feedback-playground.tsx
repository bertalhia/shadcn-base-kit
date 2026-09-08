"use client";

import { InboxIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { CopyButton } from "@/components/shared/copy-button";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingRows, LoadingState } from "@/components/shared/loading-state";
import { ResponsiveDialog } from "@/components/shared/responsive-dialog";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DirectionProvider } from "@/components/ui/direction";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { notify } from "@/lib/notify";

/**
 * Every way this app tells someone what happened, on one screen.
 *
 * Worth having as a scenario because these are the pieces that only show up
 * when something goes wrong, which is exactly when nobody has looked at them.
 */
export function FeedbackPlayground() {
  const [progress, setProgress] = React.useState(35);
  const [rtl, setRtl] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-8">
      <Section
        title="Toasts"
        description="Anything that happened away from where the person is looking."
      >
        <ButtonGroup>
          <Button
            variant="outline"
            onClick={() => notify.success("Settings saved.")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => notify.info("Two devices are still syncing.")}
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() => notify.warning("This plan expires in three days.")}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify.error("The card was declined.", "Payment failed")
            }
          >
            Error
          </Button>
        </ButtonGroup>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() =>
              notify.undoable("Invoice moved to the archive.", () =>
                notify.info("Invoice restored."),
              )
            }
          >
            <RotateCcwIcon />
            With undo
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify.promise(
                new Promise<{ name: string }>((resolve) =>
                  window.setTimeout(() => resolve({ name: "August" }), 1800),
                ),
                {
                  loading: "Building the report…",
                  success: (result) => `${result.name} report is ready.`,
                  error: "The report could not be built.",
                },
              )
            }
          >
            Following an async task
          </Button>
        </div>
      </Section>

      <Separator />

      <Section title="Asking before something irreversible">
        <div className="flex flex-wrap gap-2">
          <ConfirmDialog
            title="Delete this workspace?"
            description="Projects, deployments and billing history go with it."
            confirmLabel="Delete workspace"
            destructive
            onConfirm={async () => {
              await new Promise((resolve) => window.setTimeout(resolve, 900));
              notify.success("Workspace deleted.");
            }}
            trigger={
              <Button variant="destructive">
                <Trash2Icon />
                Delete
              </Button>
            }
          />

          <ResponsiveDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Invite a teammate"
            description="They get access to this workspace only."
            trigger={<Button variant="outline">Invite</Button>}
            footer={
              <Button onClick={() => setDialogOpen(false)}>Send invite</Button>
            }
          >
            <div className="flex flex-col gap-2 py-2">
              <Label htmlFor="invite-email">Email</Label>
              <input
                id="invite-email"
                type="email"
                placeholder="name@company.com"
                className="h-8 rounded-2xl border border-transparent bg-input/50 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
              />
            </div>
          </ResponsiveDialog>

          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              Share
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <PopoverHeader>
                <PopoverTitle>Anyone with the link</PopoverTitle>
                <PopoverDescription>
                  Viewers cannot see billing or member emails.
                </PopoverDescription>
              </PopoverHeader>
              <div className="flex items-center gap-2 pt-3">
                <code className="flex-1 truncate rounded bg-muted px-2 py-1 text-xs">
                  acme.dev/s/8f3a2b
                </code>
                <CopyButton value="https://acme.dev/s/8f3a2b" />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Section>

      <Separator />

      <Section
        title="States a screen passes through"
        description="Loading, empty, failed — the three that get skipped."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Loading</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <LoadingRows rows={2} />
              <Separator />
              <LoadingState label="Checking your plan" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empty</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={<InboxIcon />}
                title="Nothing in the inbox"
                description="New tickets land here as they come in."
                action={<Button size="sm">Write the first one</Button>}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorState
                description="We could not reach the billing service. Your card was not charged."
                detail="ref 7c2a-91f0"
                action={
                  <Button size="sm" variant="outline">
                    Try again
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      <Section title="Progress and direction">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Progress value={progress} className="max-w-sm" />
            <span className="text-sm tabular-nums text-muted-foreground">
              {progress}%
            </span>
            <ButtonGroup>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setProgress((value) => Math.max(0, value - 10))}
              >
                −10
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setProgress((value) => Math.min(100, value + 10))
                }
              >
                +10
              </Button>
            </ButtonGroup>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="rtl"
              checked={rtl}
              onCheckedChange={(checked) => setRtl(checked === true)}
            />
            <Label htmlFor="rtl">Right-to-left</Label>
            <span className="text-sm text-muted-foreground">
              Press{" "}
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>{" "}
              for the command menu
            </span>
          </div>

          <DirectionProvider direction={rtl ? "rtl" : "ltr"}>
            <div className="rounded-xl border p-4" dir={rtl ? "rtl" : "ltr"}>
              <p className="text-sm">
                The components read this provider, so a mirrored layout does not
                need a second set of styles.
              </p>
              <Progress value={progress} className="mt-3 max-w-sm" />
            </div>
          </DirectionProvider>
        </div>
      </Section>
    </div>
  );
}
