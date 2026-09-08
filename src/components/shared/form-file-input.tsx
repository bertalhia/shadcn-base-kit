"use client";

import { PaperclipIcon, XIcon } from "lucide-react";
import * as React from "react";
import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/utils/number";

/**
 * Files, listed as they are picked.
 *
 * The native file input is hidden behind a button because it cannot be styled
 * and its "no file chosen" text is noise; the chosen files are shown as
 * attachments instead, each one removable.
 */
export function FormFileInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  className,
  accept,
  multiple = true,
  buttonLabel = "Choose files",
}: BaseFieldProps<TFieldValues, TName> & {
  accept?: string;
  multiple?: boolean;
  buttonLabel?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FormField
      control={control}
      name={name}
      label={label}
      description={description}
      className={className}
    >
      {({ field, invalid }) => {
        const files: File[] = Array.isArray(field.value) ? field.value : [];

        return (
          <div className="flex flex-col gap-3">
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              className="sr-only"
              onChange={(event) => {
                const picked = Array.from(event.target.files ?? []);
                field.onChange(multiple ? [...files, ...picked] : picked);
                // Let the same file be picked again after being removed.
                event.target.value = "";
              }}
            />
            <Button
              type="button"
              variant="outline"
              aria-invalid={invalid}
              onClick={() => inputRef.current?.click()}
            >
              <PaperclipIcon />
              {buttonLabel}
            </Button>
            {files.length ? (
              <AttachmentGroup>
                {files.map((file) => (
                  <Attachment key={`${file.name}-${file.lastModified}`}>
                    <AttachmentMedia variant="icon">
                      <PaperclipIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>{file.name}</AttachmentTitle>
                      <AttachmentDescription>
                        {formatBytes(file.size)}
                      </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                      <AttachmentAction
                        aria-label={`Remove ${file.name}`}
                        onClick={() =>
                          field.onChange(files.filter((item) => item !== file))
                        }
                      >
                        <XIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>
                ))}
              </AttachmentGroup>
            ) : null}
          </div>
        );
      }}
    </FormField>
  );
}
