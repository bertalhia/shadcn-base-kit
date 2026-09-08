import { Suspense } from "react";

import { AccountSettings } from "@/components/examples/account-settings";
import { AppSidebar } from "@/components/examples/app-sidebar";
import { BookingPanel } from "@/components/examples/booking-panel";
import { BugReportForm } from "@/components/examples/bug-report-form";
import { CheckoutForm } from "@/components/examples/checkout-form";
import { FeedbackPlayground } from "@/components/examples/feedback-playground";
import { OnboardingQuestionnaire } from "@/components/examples/onboarding-questionnaire";
import { OrdersTable } from "@/components/examples/orders-table";
import { ProductGallery } from "@/components/examples/product-gallery";
import { ReleaseNotes } from "@/components/examples/release-notes";
import { RevenueDashboard } from "@/components/examples/revenue-dashboard";
import { ScenarioTabs } from "@/components/examples/scenario-tabs";
import { SiteHeader } from "@/components/examples/site-header";
import { SupportChat } from "@/components/examples/support-chat";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const panels = [
  { value: "dashboard", label: "Dashboard", content: <RevenueDashboard /> },
  {
    value: "orders",
    label: "Orders",
    content: <OrdersTable />,
    queryKeys: [
      "orders_q",
      "orders_sort",
      "orders_filters",
      "orders_page",
      "orders_perPage",
      "orders_hidden",
      "orders_selected",
      "orders_placed_from",
      "orders_placed_to",
    ],
  },
  { value: "checkout", label: "Checkout", content: <CheckoutForm /> },
  {
    value: "settings",
    label: "Settings",
    queryKeys: ["settings"],
    content: (
      <div className="flex flex-col gap-8">
        <AccountSettings />
        <Separator />
        <BugReportForm />
      </div>
    ),
  },
  { value: "catalog", label: "Catalog", content: <ProductGallery /> },
  {
    value: "booking",
    label: "Booking",
    content: <BookingPanel />,
    queryKeys: ["booking_date", "booking_page"],
  },
  { value: "support", label: "Support", content: <SupportChat /> },
  {
    value: "feedback",
    label: "Feedback",
    content: <FeedbackPlayground />,
    queryKeys: ["demo_progress", "demo_rtl"],
  },
  { value: "docs", label: "Docs", content: <ReleaseNotes /> },
];

/**
 * Every scenario on one page, to see them working together.
 *
 * `SidebarProvider` and `SidebarInset` are composed here rather than inside a
 * shell component — in the app router that arrangement belongs to whichever
 * layout or page wants it.
 *
 * The Suspense boundaries are not decoration: `useQueryState` reads
 * `useSearchParams()` underneath, and without them this page cannot be
 * statically prerendered.
 */
export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense>
          <SiteHeader />
        </Suspense>

        <main className="flex flex-1 flex-col gap-8 p-6">
          <PageHeader
            title="Component scenarios"
            description="Ten screens built from the shared layer, together covering every component in src/components/ui."
            actions={<OnboardingQuestionnaire />}
          />

          <Suspense fallback={<LoadingState label="Loading scenarios" />}>
            <ScenarioTabs panels={panels} />
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
