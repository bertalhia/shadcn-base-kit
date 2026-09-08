"use client";

import * as React from "react";

import { ResponsiveDialog } from "@/components/shared/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { notify } from "@/lib/notify";

const items = [
  {
    name: "role",
    required: true,
    prompt: "What brings you here?",
    description: "It changes which templates we put first.",
    choices: [
      {
        value: "selling",
        label: "Selling something",
        description: "A storefront, a booking page, a subscription.",
      },
      {
        value: "internal",
        label: "An internal tool",
        description: "Dashboards and admin screens for a team.",
      },
      { value: "portfolio", label: "A portfolio or site" },
    ],
    input: { label: "Something else", placeholder: "Tell us in a few words" },
  },
  {
    name: "size",
    required: true,
    prompt: "How many people will use it?",
    choices: [
      { value: "solo", label: "Just me" },
      { value: "small", label: "Under ten" },
      { value: "large", label: "More than ten" },
    ],
  },
  {
    name: "timeline",
    required: false,
    prompt: "When do you need it live?",
    description: "Skip this if you are still deciding.",
    choices: [
      { value: "week", label: "This week" },
      { value: "month", label: "This month" },
      { value: "later", label: "No date yet" },
    ],
  },
] as const;

/**
 * Onboarding, one question at a time.
 *
 * `Questionnaire` owns the ordered items, the answers, validation, progress
 * and navigation. What is left to the screen — and what a dialog cannot
 * delegate — is what happens on close and where the answers go.
 *
 * It submits as a form, so the answers arrive as `FormData` rather than as
 * state we would have to mirror.
 */
export function OnboardingQuestionnaire() {
  const [open, setOpen] = React.useState(false);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const answers = new FormData(event.currentTarget);
    const role = answers.get("role");
    setOpen(false);
    notify.success(
      typeof role === "string" && role
        ? `Templates for "${role}" are ready.`
        : "Answers saved.",
    );
  }

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="Set up your workspace"
      description="Three questions. You can change any of it later."
      trigger={<Button variant="outline">Start onboarding</Button>}
      className="sm:max-w-lg"
    >
      <Questionnaire items={items} shortcuts="numbers" onSubmit={handleSubmit}>
        <QuestionnaireProgress />
        {items.map((question) => (
          <QuestionnaireItem
            key={question.name}
            name={question.name}
            required={question.required}
          >
            <QuestionnaireTitle>{question.prompt}</QuestionnaireTitle>
            {"description" in question ? (
              <QuestionnaireDescription>
                {question.description}
              </QuestionnaireDescription>
            ) : null}
            <QuestionnaireChoices>
              {question.choices.map((choice) => (
                <QuestionnaireChoice key={choice.value} value={choice.value}>
                  <span className="font-medium">{choice.label}</span>
                  {"description" in choice ? (
                    <span className="text-muted-foreground">
                      {choice.description}
                    </span>
                  ) : null}
                </QuestionnaireChoice>
              ))}
              {"input" in question ? (
                <QuestionnaireInput
                  aria-label={question.input.label}
                  placeholder={question.input.placeholder}
                />
              ) : null}
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
        ))}
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>
    </ResponsiveDialog>
  );
}
