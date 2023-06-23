import AppContentHeader from "@/components/AppContentHeader";
import SingleStatsComponent from "@/components/SingleStatsComponent";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { SUBSCRIPTION_CURRENCY } from "@prisma/client";
import { format } from "date-fns";

const getDataForDashboard = async () => {
  const { userId } = auth();

  try {
    if (!userId) return;
    const res = prisma.subscription.findMany({
      where: { ownerId: userId },
      include: { payments: true },
      orderBy: { next_payment_date: "asc" },
    });
    return res;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export default async function DashboardPage() {
  const data = await getDataForDashboard();

  return (
    <section className="h-full p-8">
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Dashboard" />

      {/* CONTENT */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-3 grid-rows-[80px,_1fr] gap-6 py-6">
        {/* STATS */}
        <div className="col-span-3 row-start-1 row-end-2 rounded-xl bg-zinc-50 xl:col-span-2">
          <div className="mx-6 flex h-full items-center justify-between gap-6">
            <div>
              <h1 className="text-xl font-semibold leading-5 tracking-wide">
                {format(new Date(), "LLLL")}
              </h1>
              <p className="text-xs text-zinc-500">
                {format(new Date(), "yyyy")}
              </p>
            </div>
            <SingleStatsComponent
              sum={36.6}
              currency={SUBSCRIPTION_CURRENCY.PLN}
              subTitle={`Paid in ${format(new Date(), "LLLL")}`}
            />
          </div>
        </div>
        {/* DATA TABLE */}
        <div className="col-span-3 row-start-2 row-end-3 rounded-xl bg-zinc-50 p-6 xl:col-span-2"></div>
        {/* GROUP STATS */}
        <div className="row-span-2 hidden rounded-xl bg-zinc-50 xl:flex"></div>
      </main>
    </section>
  );
}
