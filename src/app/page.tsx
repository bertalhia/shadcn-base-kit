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
import { SiteHeader } from "@/components/examples/site-header";
import { SupportChat } from "@/components/examples/support-chat";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

          <Tabs defaultValue="dashboard">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="checkout">Checkout</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="catalog">Catalog</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="docs">Docs</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <RevenueDashboard />
            </TabsContent>

            <TabsContent value="orders">
              <Suspense fallback={<LoadingState label="Loading orders" />}>
                <OrdersTable />
              </Suspense>
            </TabsContent>

            <TabsContent value="checkout">
              <CheckoutForm />
            </TabsContent>

            <TabsContent value="settings">
              <div className="flex flex-col gap-8">
                <AccountSettings />
                <Separator />
                <BugReportForm />
              </div>
            </TabsContent>

            <TabsContent value="catalog">
              <ProductGallery />
            </TabsContent>

            <TabsContent value="booking">
              <BookingPanel />
            </TabsContent>

            <TabsContent value="support">
              <SupportChat />
            </TabsContent>

            <TabsContent value="feedback">
              <FeedbackPlayground />
            </TabsContent>

            <TabsContent value="docs">
              <ReleaseNotes />
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
