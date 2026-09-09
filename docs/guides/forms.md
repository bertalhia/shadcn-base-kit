# Forms

React Hook Form for the values, Zod for the rules, `Field` for the layout. This holds for every form, from a single input to a hundred. No exceptions.

Upstream: https://ui.shadcn.com/docs/forms/react-hook-form.md

## The shape of one

```tsx
const form = useZodForm(schema, { defaultValues });

<Form form={form} onSubmit={handleSubmit}>
  <FormSection>
    <FormInput control={form.control} name="email" label="Email" />
    <FormPhoneInput control={form.control} name="phone" label="Phone" />
  </FormSection>
  <FormActions>
    <SubmitButton control={form.control}>Save</SubmitButton>
  </FormActions>
</Form>;
```

`useZodForm` fixes the resolver, the inferred types and the validation mode, so no form re-decides them. `SubmitButton` reads its own pending state off the form — no screen threads an `isLoading` prop down to it.

## There is a component for every control

| Control | Component |
| --- | --- |
| Text | [`FormInput`](../shared/form-input.md) |
| Multi-line | [`FormTextarea`](../shared/form-textarea.md) |
| Password | [`FormPasswordInput`](../shared/form-password-input.md) |
| Closed list | [`FormSelect`](../shared/form-select.md) · [`FormNativeSelect`](../shared/form-native-select.md) |
| Searchable list | [`FormCombobox`](../shared/form-combobox.md) |
| Boolean | [`FormCheckbox`](../shared/form-checkbox.md) · [`FormSwitch`](../shared/form-switch.md) |
| Several of a set | [`FormCheckboxGroup`](../shared/form-checkbox-group.md) · [`FormToggleGroup`](../shared/form-toggle-group.md) |
| One of a set | [`FormRadioGroup`](../shared/form-radio-group.md) |
| Number in a range | [`FormSlider`](../shared/form-slider.md) |
| Date | [`FormDatePicker`](../shared/form-date-picker.md) · [`FormDateRangePicker`](../shared/form-date-range-picker.md) |
| One-time code | [`FormOTP`](../shared/form-otp.md) |
| Files | [`FormFileInput`](../shared/form-file-input.md) |
| Phone | [`FormPhoneInput`](../shared/form-phone-input.md) |
| CPF / CNPJ | [`FormDocumentInput`](../shared/form-document-input.md) |
| Money | [`FormCurrencyInput`](../shared/form-currency-input.md) |
| Country, state, city | [`FormAddressFields`](../shared/form-address-fields.md) |

Missing one? Add it to `shared/` on top of `FormField`. Do not hand-roll a field inside a screen.

## What `FormField` already handles

It owns the four things the Field docs ask for and that are easy to get subtly wrong once per field: `data-invalid` on the wrapper, `htmlFor` tied to the control id, the description, and `FieldError` fed from React Hook Form. A new field component only renders its control:

```tsx
<FormField control={control} name={name} label={label}>
  {({ field, id, invalid }) => (
    <SomeControl {...field} id={id} aria-invalid={invalid} />
  )}
</FormField>
```

Wiring per control type, for when you write a new one:

- `Input` / `Textarea`: spread `{...field}`.
- `Select` / `Combobox` / `RadioGroup` / `ToggleGroup`: `value` and `onValueChange`, and `aria-invalid` on the trigger — that is the element a person focuses.
- `Checkbox` / `Switch`: `checked` and `onCheckedChange`.
- Checkbox group: `data-slot="checkbox-group"` on the `<FieldGroup>`.
- Dynamic list: `useFieldArray`, with one field component per item.

## Two settled decisions

**Leave `mode` alone.** React Hook Form validates on submit, and that is the behaviour this project wants. `onBlur` and `onTouched` flag a field the moment focus leaves it, so tabbing through a form paints errors under inputs nobody has finished filling.

**A description line only earns its place when it says something the label cannot.** `Password` + "At least 8 characters" stays: that is a rule nobody can guess, and it prevents a rejected submit. `Phone` + "So we can reach you about your order" goes; everyone knows what a phone is for. See [writing-ui-copy.md](writing-ui-copy.md).

## Schemas

`src/schemas/fields.ts` already knows how the masked inputs store their values. `phoneSchema` takes what the person sees and transforms it to E.164; `documentSchema` strips the CPF/CNPJ mask before checking it. Reuse them rather than restating the rule per form.

## The long-hand version

[`examples/bug-report-form`](../examples/bug-report-form.md) wires `Controller`, `Field`, `aria-invalid` and `FieldError` by hand. It stays as a reference for what `FormField` is doing for you. A new screen should never look like it.
