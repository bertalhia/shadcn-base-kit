"use client";

import { KeyRoundIcon, SaveIcon, Trash2Icon, UploadIcon } from "lucide-react";
import * as z from "zod";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Form, FormSection, useZodForm } from "@/components/shared/form";
import { FormActions } from "@/components/shared/form-actions";
import { FormCheckboxGroup } from "@/components/shared/form-checkbox-group";
import { FormCombobox } from "@/components/shared/form-combobox";
import { FormFileInput } from "@/components/shared/form-file-input";
import { FormInput } from "@/components/shared/form-input";
import { FormOtp } from "@/components/shared/form-otp";
import { FormPasswordInput } from "@/components/shared/form-password-input";
import { FormSlider } from "@/components/shared/form-slider";
import { FormSwitch } from "@/components/shared/form-switch";
import { FormTextarea } from "@/components/shared/form-textarea";
import { FormToggleGroup } from "@/components/shared/form-toggle-group";
import { QueryTabs } from "@/components/shared/query-tabs";
import { Section } from "@/components/shared/section";
import { SubmitButton } from "@/components/shared/submit-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { notify } from "@/lib/notify";
import { emailSchema, passwordSchema } from "@/schemas/fields";

const timezones = [
  { value: "utc", label: "UTC" },
  { value: "lisbon", label: "Lisbon — WET" },
  { value: "sao-paulo", label: "São Paulo — BRT" },
  { value: "new-york", label: "New York — EST" },
  { value: "los-angeles", label: "Los Angeles — PST" },
  { value: "tokyo", label: "Tokyo — JST" },
];

const digestOptions = [
  {
    value: "mentions",
    label: "Mentions",
    description: "Someone names you in a thread.",
  },
  {
    value: "reviews",
    label: "Review requests",
    description: "A pull request is assigned to you.",
  },
  { value: "releases", label: "Releases" },
  { value: "security", label: "Security alerts" },
];

const densityOptions = [
  { value: "compact", label: "Compact" },
  { value: "cozy", label: "Cozy" },
  { value: "roomy", label: "Roomy" },
];

const profileSchema = z.object({
  displayName: z.string().min(2, "Enter a name people will recognise."),
  email: emailSchema,
  bio: z.string().max(160, "Keep the bio under 160 characters.").optional(),
  timezone: z.string().min(1, "Pick a timezone."),
  avatar: z.array(z.instanceof(File)).optional(),
});

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password."),
  newPassword: passwordSchema,
  totp: z.string().length(6, "The code has 6 digits."),
});

const preferencesSchema = z.object({
  digest: z.array(z.string()),
  density: z.string(),
  fontSize: z.array(z.number()),
  reduceMotion: z.boolean(),
  betaFeatures: z.boolean(),
});

/**
 * Account settings across three tabs, each its own form.
 *
 * Separate forms rather than one giant object: a person changing their
 * timezone should not have to re-enter a password, and each tab can be saved
 * on its own.
 */
export function AccountSettings() {
  const profileForm = useZodForm(profileSchema, {
    defaultValues: {
      displayName: "Ada Lovelace",
      email: "ada@example.com",
      bio: "",
      timezone: "lisbon",
      avatar: [],
    },
  });

  const securityForm = useZodForm(securitySchema, {
    defaultValues: { currentPassword: "", newPassword: "", totp: "" },
  });

  const preferencesForm = useZodForm(preferencesSchema, {
    defaultValues: {
      digest: ["mentions", "security"],
      density: "cozy",
      fontSize: [15],
      reduceMotion: false,
      betaFeatures: false,
    },
  });

  return (
    <QueryTabs
      queryKey="settings"
      values={["profile", "security", "preferences"]}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Form
          form={profileForm}
          onSubmit={() => notify.success("Profile updated.")}
          className="flex max-w-2xl flex-col gap-6"
        >
          <Section title="Profile" description="How you appear to your team.">
            <div className="flex items-center gap-4">
              <Avatar size="lg">
                <AvatarImage src="" alt="" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <Label>Avatar</Label>
                <p className="text-sm text-muted-foreground">
                  Square images look best. Up to 2 MB.
                </p>
              </div>
            </div>

            <FormSection>
              <FormFileInput
                control={profileForm.control}
                name="avatar"
                label="Upload a new picture"
                accept="image/*"
                multiple={false}
                buttonLabel="Choose an image"
              />
              <FormInput
                control={profileForm.control}
                name="displayName"
                label="Display name"
              />
              <FormInput
                control={profileForm.control}
                name="email"
                label="Email"
                type="email"
              />
              <FormTextarea
                control={profileForm.control}
                name="bio"
                label="Bio"
                rows={3}
              />
              <FormCombobox
                control={profileForm.control}
                name="timezone"
                label="Timezone"
                options={timezones}
                placeholder="Search timezones"
              />
            </FormSection>
          </Section>

          <FormActions>
            <SubmitButton control={profileForm.control}>
              <SaveIcon />
              Save profile
            </SubmitButton>
          </FormActions>
        </Form>
      </TabsContent>

      <TabsContent value="security">
        <Form
          form={securityForm}
          onSubmit={() => notify.success("Password changed.")}
          className="flex max-w-2xl flex-col gap-6"
        >
          <Section
            title="Password"
            description="Changing it signs you out everywhere else."
          >
            <FormSection>
              <FormPasswordInput
                control={securityForm.control}
                name="currentPassword"
                label="Current password"
              />
              <FormPasswordInput
                control={securityForm.control}
                name="newPassword"
                label="New password"
                description="At least 8 characters, with an uppercase letter and a number."
                autoComplete="new-password"
              />
              <FormOtp
                control={securityForm.control}
                name="totp"
                label="Authenticator code"
                groups={[3, 3]}
              />
            </FormSection>
          </Section>

          <FormActions>
            <SubmitButton control={securityForm.control}>
              <KeyRoundIcon />
              Change password
            </SubmitButton>
          </FormActions>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Delete this account</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Your projects and their history go with it. There is no undo.
              </p>
              <ConfirmDialog
                title="Delete your account?"
                description="Projects, deployments and billing history are removed immediately."
                confirmLabel="Delete account"
                destructive
                onConfirm={() => {
                  notify.success("Account scheduled for deletion.");
                }}
                trigger={
                  <Button variant="destructive" className="w-fit">
                    <Trash2Icon />
                    Delete account
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </Form>
      </TabsContent>

      <TabsContent value="preferences">
        <Form
          form={preferencesForm}
          onSubmit={() => notify.success("Preferences saved.")}
          className="flex max-w-2xl flex-col gap-6"
        >
          <Section title="Notifications">
            <FormCheckboxGroup
              control={preferencesForm.control}
              name="digest"
              label="Email me about"
              options={digestOptions}
            />
          </Section>

          <Section title="Appearance">
            <FormSection>
              <FormToggleGroup
                control={preferencesForm.control}
                name="density"
                label="Density"
                options={densityOptions}
                variant="outline"
              />
              <FormSlider
                control={preferencesForm.control}
                name="fontSize"
                label="Base font size"
                description={`${preferencesForm.watch("fontSize")?.[0] ?? 15} px`}
                min={12}
                max={20}
                step={1}
              />
              <FormSwitch
                control={preferencesForm.control}
                name="reduceMotion"
                label="Reduce motion"
                description="Turns off the sliding and fading transitions."
              />
              <FormSwitch
                control={preferencesForm.control}
                name="betaFeatures"
                label="Beta features"
                description="Things still being built. They can break."
              />
            </FormSection>
          </Section>

          <Section title="Shortcuts">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Tooltip>
                <TooltipTrigger render={<Toggle aria-label="Toggle sidebar" />}>
                  Sidebar
                </TooltipTrigger>
                <TooltipContent>
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>B</Kbd>
                  </KbdGroup>
                </TooltipContent>
              </Tooltip>
              <span className="text-muted-foreground">Command menu</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          </Section>

          <FormActions>
            <SubmitButton control={preferencesForm.control}>
              <UploadIcon />
              Save preferences
            </SubmitButton>
          </FormActions>
        </Form>
      </TabsContent>
    </QueryTabs>
  );
}
