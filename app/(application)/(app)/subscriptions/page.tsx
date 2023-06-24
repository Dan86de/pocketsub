import AppContentHeader from "@/components/AppContentHeader";
import { exchangeRates } from "@/components/DashboardCatBreakdown";
import SingleStatsComponent from "@/components/SingleStatsComponent";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  Payment,
  SUBSCRIPTION_BILLING_PERIOD,
  Subscription,
} from "@prisma/client";

function getStats(
  data: (Subscription & {
    payments: Payment[];
  })[]
) {
  let activeSubscriptions = 0;
  let mostExpensive = 0;
  let cheapest = Infinity;
  let totalMonthlyCost = 0;
  let totalYearlyCost = 0;

  data.forEach((subscription) => {
    activeSubscriptions++;

    const costInPln =
      subscription.price * exchangeRates[subscription.currency];

    if (costInPln > mostExpensive) {
      mostExpensive = costInPln;
    }

    if (costInPln < cheapest) {
      cheapest = costInPln;
    }

    switch (subscription.billing_period) {
      case SUBSCRIPTION_BILLING_PERIOD.MONTHLY:
        totalMonthlyCost += costInPln;
        totalYearlyCost += costInPln * 12;
        break;
      case SUBSCRIPTION_BILLING_PERIOD.QUARTERLY:
        totalMonthlyCost += costInPln / 3;
        totalYearlyCost += costInPln * 4;
        break;
      case SUBSCRIPTION_BILLING_PERIOD.YEARLY:
        totalMonthlyCost += costInPln / 12;
        totalYearlyCost += costInPln;
        break;

      default:
        break;
    }
  });
  const avgCostPerSub = totalMonthlyCost / activeSubscriptions;
  return {
    totalActiveSubscriptions: activeSubscriptions,
    mostExpensive: mostExpensive.toFixed(2),
    cheapest: cheapest.toFixed(2),
    averageCostPerSubscription: avgCostPerSub.toFixed(2),
    totalMonthlyCost: totalMonthlyCost.toFixed(2),
    totalYearlyCost: totalYearlyCost.toFixed(2),
  };
}

const getDataForDashboard = async () => {
  const { userId } = auth();

  try {
    if (!userId) return;
    const res = prisma.subscription.findMany({
      where: { ownerId: userId },
      include: { payments: true },
      orderBy: { next_payment_date: "desc" },
    });
    return res;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export default async function SubscriptionsPage() {
  const data = await getDataForDashboard();
  if (!data) return null;
  const stats = getStats(data);
  return (
    <section className="h-full p-8">
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Subscriptions" />

      {/* CONTENT */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-1 grid-rows-[80px,_1fr] gap-6 py-6">
        <div className="rounded-xl bg-zinc-50 p-6">
          <div className="flex h-full items-center justify-between">
            <div className="flex h-full items-center gap-6">
              <SingleStatsComponent
                sum={stats.totalActiveSubscriptions}
                subTitle="Active subscriptions"
              />
            </div>
            <div className="flex h-full items-center gap-6">
              <SingleStatsComponent
                sum={stats.mostExpensive}
                subTitle="Most expensive subscription"
              />
              <SingleStatsComponent
                sum={stats.cheapest}
                subTitle="Cheapest subscription"
              />
              <SingleStatsComponent
                sum={stats.averageCostPerSubscription}
                subTitle="Avg cost"
              />
              <SingleStatsComponent
                sum={stats.totalMonthlyCost}
                subTitle="Total monthly cost"
              />
              <SingleStatsComponent
                sum={stats.totalYearlyCost}
                subTitle="Total yearly cost"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-zinc-50 p-6"></div>
      </main>
    </section>
  );
}
