import AppContentHeader from "@/components/AppContentHeader";
import DashboardCatBreakdown from "@/components/DashboardCatBreakdown";
import DashboardDataTable from "@/components/DashboardDataTable";
import DashboardMainStats from "@/components/DashboardMainStats";
import { auth } from "@clerk/nextjs";
import { getSubscriptions } from "../../actions";

export default async function DashboardPage() {
  const { userId } = auth();
  const data = await getSubscriptions(userId!, {
    key: "next_payment_date",
    value: "desc",
  });

  if (!data) return null;

  return (
    <section className="h-full p-8">
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Dashboard" />

      {/* CONTENT */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-3 grid-rows-[80px,_1fr] gap-6 py-6">
        {/* STATS */}
        <DashboardMainStats subscriptions={data} />
        {/* DATA TABLE */}
        <DashboardDataTable intialData={data} />
        {/* GROUP STATS */}
        <DashboardCatBreakdown data={data} />
      </main>
    </section>
  );
}
