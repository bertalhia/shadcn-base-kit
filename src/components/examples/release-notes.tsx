import { ChevronRightIcon, InfoIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
  TypographyLead,
  TypographyLink,
  TypographyList,
  TypographyMuted,
  TypographyOrderedList,
  TypographyP,
  TypographySmall,
  TypographyTable,
  TypographyTableCell,
  TypographyTableHead,
  TypographyTableRow,
} from "@/components/ui/typography";
import { formatDate } from "@/lib/date";

const breakingChanges = [
  {
    api: "createClient(url, key)",
    change: "Now takes a single options object.",
    since: "2026-08-01",
  },
  {
    api: "client.fetchAll()",
    change: "Returns a paginated cursor instead of an array.",
    since: "2026-08-01",
  },
  {
    api: "client.on('error')",
    change: "Renamed to client.on('failure').",
    since: "2026-07-14",
  },
];

/**
 * A written page — the case the typography components exist for.
 *
 * Everything here is prose and structure, so it is a server component: no
 * state, no handlers, nothing to send to the browser.
 */
export function ReleaseNotes() {
  return (
    <article className="mx-auto flex max-w-2xl flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Changelog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>v4.0</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TypographyH1 className="mt-6">Version 4.0</TypographyH1>
      <TypographySmall className="mt-2 text-muted-foreground">
        Released {formatDate("2026-08-01", "long")}
      </TypographySmall>

      <TypographyLead>
        The client is now built on the platform fetch, which cuts the bundle
        roughly in half and makes it run anywhere fetch does.
      </TypographyLead>

      <Alert className="mt-6">
        <InfoIcon />
        <AlertTitle>This release has breaking changes</AlertTitle>
        <AlertDescription>
          The codemod handles most of them:{" "}
          <TypographyInlineCode>npx @acme/upgrade@4</TypographyInlineCode>
        </AlertDescription>
      </Alert>

      <TypographyH2>What changed</TypographyH2>
      <TypographyP>
        Every request goes through the platform{" "}
        <TypographyInlineCode>fetch</TypographyInlineCode>, so the polyfill is
        gone and so is the Node-only transport. Timeouts and cancellation are an{" "}
        <TypographyInlineCode>AbortSignal</TypographyInlineCode> you pass in,
        rather than options we invented.
      </TypographyP>

      <TypographyList>
        <li>Bundle down from 41 KB to 19 KB gzipped.</li>
        <li>Runs on workers and edge runtimes without a shim.</li>
        <li>Retries are opt-in, and never applied to non-idempotent calls.</li>
      </TypographyList>

      <TypographyH3>Upgrading</TypographyH3>
      <TypographyOrderedList>
        <li>
          Update the package:{" "}
          <TypographyInlineCode>pnpm add @acme/client@4</TypographyInlineCode>
        </li>
        <li>Run the codemod.</li>
        <li>Fix whatever the table below says the codemod left behind.</li>
      </TypographyOrderedList>

      <TypographyTable>
        <thead>
          <TypographyTableRow>
            <TypographyTableHead>API</TypographyTableHead>
            <TypographyTableHead>Change</TypographyTableHead>
            <TypographyTableHead>Since</TypographyTableHead>
          </TypographyTableRow>
        </thead>
        <tbody>
          {breakingChanges.map((entry) => (
            <TypographyTableRow key={entry.api}>
              <TypographyTableCell>
                <TypographyInlineCode>{entry.api}</TypographyInlineCode>
              </TypographyTableCell>
              <TypographyTableCell>{entry.change}</TypographyTableCell>
              <TypographyTableCell>
                {formatDate(entry.since)}
              </TypographyTableCell>
            </TypographyTableRow>
          ))}
        </tbody>
      </TypographyTable>

      <TypographyBlockquote>
        We kept the old transport around for two minor versions and nobody used
        it. That is the clearest signal we get.
      </TypographyBlockquote>

      <Separator className="my-8" />

      <TypographyH2>Frequently asked</TypographyH2>
      <Accordion className="mt-4">
        <AccordionItem value="node">
          <AccordionTrigger>Does this still work on Node 18?</AccordionTrigger>
          <AccordionContent>
            <TypographyP>
              Yes. Node 18 ships a global fetch, so nothing extra is needed. On
              Node 16 you have to stay on v3.
            </TypographyP>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="retries">
          <AccordionTrigger>Why are retries opt-in now?</AccordionTrigger>
          <AccordionContent>
            <TypographyP>
              Retrying a POST that already succeeded charges a card twice. The
              old default did that, and we could not tell from the client which
              calls were safe.
            </TypographyP>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Collapsible className="group/deprecations mt-8">
        <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
          <ChevronRightIcon className="transition-transform group-data-open/deprecations:rotate-90" />
          Deprecations scheduled for v5
          <Badge variant="outline">3</Badge>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <TypographyMuted className="mt-3">
            These still work in 4.0 and will warn from 4.2.
          </TypographyMuted>
          <TypographyList>
            <li>
              <TypographyInlineCode>client.legacyAuth()</TypographyInlineCode>
            </li>
            <li>
              <TypographyInlineCode>client.rawQuery()</TypographyInlineCode>
            </li>
            <li>
              <TypographyInlineCode>createLegacyClient()</TypographyInlineCode>
            </li>
          </TypographyList>
        </CollapsibleContent>
      </Collapsible>

      <TypographyP>
        The full diff is on <TypographyLink href="#">GitHub</TypographyLink>.
      </TypographyP>
    </article>
  );
}
