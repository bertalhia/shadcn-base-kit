"use client";

import { LockIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";
import * as z from "zod";

import { Form, FormSection, useZodForm } from "@/components/shared/form";
import { FormActions } from "@/components/shared/form-actions";
import { FormAddressFields } from "@/components/shared/form-address-fields";
import { FormCheckbox } from "@/components/shared/form-checkbox";
import { FormDocumentInput } from "@/components/shared/form-document-input";
import { FormInput } from "@/components/shared/form-input";
import { FormPhoneInput } from "@/components/shared/form-phone-input";
import { FormRadioGroup } from "@/components/shared/form-radio-group";
import { FormTextarea } from "@/components/shared/form-textarea";
import { Section } from "@/components/shared/section";
import { SubmitButton } from "@/components/shared/submit-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { formatCents } from "@/lib/format/number";
import {
  cepSchema,
  documentSchema,
  emailSchema,
  phoneSchema,
} from "@/lib/format/validators";
import { notify } from "@/lib/notify";

const shippingOptions = [
  {
    value: "standard",
    label: "Standard",
    description: "Arrives in 5–7 business days. Free over $50.",
  },
  {
    value: "express",
    label: "Express",
    description: "Arrives in 2 business days. $12.00.",
  },
  {
    value: "pickup",
    label: "Pick up in store",
    description: "Ready in about 2 hours at the Market Street shop.",
  },
];

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Enter the name on the card."),
  email: emailSchema,
  phone: phoneSchema,
  document: documentSchema,
  street: z.string().min(3, "Enter a street address."),
  complement: z.string().optional(),
  postalCode: cepSchema,
  country: z.string().min(1, "Pick a country."),
  state: z.string().min(1, "Pick a state."),
  city: z.string().min(1, "Pick a city."),
  shipping: z.string().min(1, "Pick a shipping option."),
  notes: z
    .string()
    .max(280, "Keep delivery notes under 280 characters.")
    .optional(),
  saveDetails: z.boolean(),
  // `z.literal(true)` would type the field as `true`, leaving no unchecked
  // state to start from. A refined boolean keeps the input a boolean.
  acceptTerms: z.boolean().refine((accepted) => accepted, {
    message: "You have to accept the terms to place the order.",
  }),
});

const cart = [
  {
    id: "kbd",
    name: "Mechanical keyboard",
    detail: "Tactile, 75%",
    cents: 18900,
  },
  {
    id: "cbl",
    name: "Braided USB-C cable",
    detail: "2 m, charcoal",
    cents: 2400,
  },
  { id: "mat", name: "Desk mat", detail: "Large, felt", cents: 4500 },
];

const subtotal = cart.reduce((total, line) => total + line.cents, 0);

/**
 * Checkout: the long form, end to end.
 *
 * Everything a real one has to handle at once — a document that switches
 * between CPF and CNPJ, a phone formatted per country, addresses, a shipping
 * choice as cards, and a terms box that blocks submission.
 */
export function CheckoutForm() {
  const form = useZodForm(checkoutSchema, {
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      document: "",
      street: "",
      complement: "",
      postalCode: "",
      country: "US",
      state: "",
      city: "",
      shipping: "standard",
      notes: "",
      saveDetails: true,
      acceptTerms: false,
    },
  });

  const shipping = form.watch("shipping");
  const shippingCents = shipping === "express" ? 1200 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Form
        form={form}
        onSubmit={async (values) => {
          await notify.promise(
            new Promise((resolve) => window.setTimeout(resolve, 1200)),
            {
              loading: "Placing your order…",
              success: `Order confirmed for ${values.email}.`,
              error: "We could not place the order.",
            },
          );
        }}
        className="flex flex-col gap-8"
      >
        <Section
          title="Contact"
          description="Where the receipt and delivery updates go."
        >
          <FormSection>
            <FormInput
              control={form.control}
              name="fullName"
              label="Full name"
              autoComplete="name"
            />
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
            />
            <FormPhoneInput control={form.control} name="phone" label="Phone" />
            <FormDocumentInput
              control={form.control}
              name="document"
              label="CPF or CNPJ"
              description="A company order needs the CNPJ to be invoiced."
            />
          </FormSection>
        </Section>

        <Section title="Delivery address">
          <FormSection>
            <FormInput
              control={form.control}
              name="street"
              label="Street address"
              autoComplete="street-address"
            />
            <FormInput
              control={form.control}
              name="complement"
              label="Apartment, floor, or unit"
            />
            <FormInput
              control={form.control}
              name="postalCode"
              label="Postal code"
              inputMode="numeric"
              autoComplete="postal-code"
            />
            <FormAddressFields
              control={form.control}
              setValue={form.setValue}
              countryName="country"
              stateName="state"
              cityName="city"
            />
          </FormSection>
        </Section>

        <Section title="Shipping">
          <FormRadioGroup
            control={form.control}
            name="shipping"
            options={shippingOptions}
          />
          <FormTextarea
            control={form.control}
            name="notes"
            label="Delivery notes"
            rows={3}
            placeholder="Gate code, a safe spot to leave it, anything the courier should know."
          />
        </Section>

        <FieldSeparator />

        <Section title="Confirm">
          <Alert>
            <ShieldCheckIcon />
            <AlertTitle>Card details are entered on the next step</AlertTitle>
            <AlertDescription>
              Nothing is charged until you confirm the amount there.
            </AlertDescription>
          </Alert>
          <FormSection>
            <FormCheckbox
              control={form.control}
              name="saveDetails"
              label="Save these details for next time"
            />
            <FormCheckbox
              control={form.control}
              name="acceptTerms"
              label="I accept the terms of sale"
            />
          </FormSection>
        </Section>

        <FormActions>
          <SubmitButton control={form.control} pendingLabel="Placing order">
            <LockIcon />
            Place order
          </SubmitButton>
          <Button type="button" variant="ghost" onClick={() => form.reset()}>
            Clear
          </Button>
        </FormActions>
      </Form>

      <Card className="h-fit lg:sticky lg:top-6">
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
          <CardDescription>{cart.length} items</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {cart.map((line) => (
            <Item key={line.id} size="sm">
              <ItemMedia variant="icon">
                <TruckIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{line.name}</ItemTitle>
                <ItemDescription>{line.detail}</ItemDescription>
              </ItemContent>
              <span className="text-sm tabular-nums">
                {formatCents(line.cents)}
              </span>
            </Item>
          ))}

          <Separator />

          <Accordion>
            <AccordionItem value="breakdown">
              <AccordionTrigger>Price breakdown</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">{formatCents(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="tabular-nums">
                    {shippingCents ? formatCents(shippingCents) : "Free"}
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-baseline justify-between">
            <span className="font-medium">Total</span>
            <span className="text-xl font-semibold tabular-nums">
              {formatCents(subtotal + shippingCents)}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <Progress value={66} />
            <p className="text-xs text-muted-foreground">
              Spend {formatCents(50000 - subtotal)} more for free express
              shipping.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant="secondary">
            <ShieldCheckIcon />
            Buyer protection included
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
}
