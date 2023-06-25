import AppContentHeader from "@/components/AppContentHeader";
import { exchangeRates } from "@/components/DashboardCatBreakdown";
import SingleStatsComponent from "@/components/SingleStatsComponent";
import { auth } from "@clerk/nextjs";
import {
  PAYMENT_STATUS,
  Payment,
  SUBSCRIPTION_BILLING_PERIOD,
  Subscription,
} from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { getSubscriptions } from "../../actions";

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

export default async function SubscriptionsPage() {
  const { userId } = auth();
  const data = await getSubscriptions(userId!, {
    key: "next_payment_date",
    value: "desc",
  });
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
        <div className="flex flex-col rounded-xl bg-zinc-50 p-6">
          <h2 className="text-lg font-semibold">Subscriptions</h2>
          <div className="relative mt-2 grow">
            <div className="absolute bottom-0 left-0 right-0 top-0 -mx-6 overflow-x-auto overflow-y-auto">
              <table className="min-w-full">
                <thead>
                  <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pl-6 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                    Name
                  </th>
                  <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                    Category
                  </th>
                  <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                    Billing period
                  </th>
                  <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                    Next payment
                  </th>
                  <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                    Payment status
                  </th>
                  <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pr-6 text-right text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                    Cost
                  </th>
                  <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-blur backdrop-filter">
                    <span className="sr-only">Edit</span>
                  </th>
                </thead>
                <tbody>
                  {data.map((subscription) => {
                    return (
                      <tr key={subscription.id}>
                        <td className="whitespace-nowrap py-4 pl-6 text-sm">
                          <div className="flex items-center justify-start gap-2">
                            <Image
                              src={subscription.avatar_url}
                              alt={`${subscription.name} logo`}
                              className="rounded-full"
                              width={16}
                              height={16}
                            />
                            {subscription.name}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm ">
                          {subscription.category}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm ">
                          {subscription.billing_period}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm ">
                          {format(
                            subscription.next_payment_date,
                            "MMM dd, yyyy"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm ">
                          {subscription.payments[0].status ===
                          PAYMENT_STATUS.PAID ? (
                            <div className="flex items-center gap-2">
                              <i className="ri-checkbox-circle-line text-green-600"></i>
                              <p>paid</p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <i className="ri-indeterminate-circle-line text-red-600"></i>
                              <p>not paid</p>
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 pr-6 text-sm ">
                          <div className="flex items-center justify-end gap-2">
                            <p>{subscription.price}</p>
                            <p>{subscription.currency}</p>
                          </div>
                        </td>
                        <td>
                          <button className="flex items-center rounded-md bg-zinc-200 px-2 text-zinc-700">
                            <i className="ri-pencil-line mr-1 text-lg"></i>
                            <p>
                              Edit{" "}
                              <span className="sr-only">
                                {subscription.name}
                              </span>
                            </p>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
