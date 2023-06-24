import { format } from "date-fns";
import SingleStatsComponent from "./SingleStatsComponent";
import {
  PAYMENT_STATUS,
  Payment,
  SUBSCRIPTION_CURRENCY,
  Subscription,
} from "@prisma/client";

function summarizePrices(
  subscriptions:
    | (Subscription & {
        payments: Payment[];
      })[]
) {
  let totalEur = 0;
  let totalUSD = 0;
  let totalPLN = 0;

  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
      totalEur += subscriptions[i].price;
    } else if (
      subscriptions[i].currency === SUBSCRIPTION_CURRENCY.USD
    ) {
      totalUSD += subscriptions[i].price;
    } else if (
      subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN
    ) {
      totalPLN += subscriptions[i].price;
    }
  }

  return {
    totalEur: parseFloat(totalEur.toFixed(2)),
    totalUSD: parseFloat(totalUSD.toFixed(2)),
    totalPLN: parseFloat(totalPLN.toFixed(2)),
  };
}

function summarizePaymentAmounts(
  subscriptions:
    | (Subscription & {
        payments: Payment[];
      })[]
) {
  let totalEurPaid = 0;
  let totalUsdPaid = 0;
  let totalPlnPaid = 0;
  let totalEurNotPaid = 0;
  let totalUsdNotPaid = 0;
  let totalPlnNotPaid = 0;

  for (let i = 0; i < subscriptions.length; i++) {
    for (let j = 0; j < subscriptions[i].payments.length; j++) {
      let amount = subscriptions[i].payments[j].amount;
      if (
        subscriptions[i].payments[j].status === PAYMENT_STATUS.PAID
      ) {
        if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
          totalEurPaid += amount;
        } else if (
          subscriptions[i].currency === SUBSCRIPTION_CURRENCY.USD
        ) {
          totalUsdPaid += amount;
        } else if (
          subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN
        ) {
          totalPlnPaid += amount;
        }
      } else {
        if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
          totalEurNotPaid += amount;
        } else if (
          subscriptions[i].currency === SUBSCRIPTION_CURRENCY.USD
        ) {
          totalUsdNotPaid += amount;
        } else if (
          subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN
        ) {
          totalPlnNotPaid += amount;
        }
      }
    }
  }

  totalEurPaid = parseFloat(totalEurPaid.toFixed(2));
  totalUsdPaid = parseFloat(totalUsdPaid.toFixed(2));
  totalPlnPaid = parseFloat(totalPlnPaid.toFixed(2));
  totalEurNotPaid = parseFloat(totalEurNotPaid.toFixed(2));
  totalUsdNotPaid = parseFloat(totalUsdNotPaid.toFixed(2));
  totalPlnNotPaid = parseFloat(totalPlnNotPaid.toFixed(2));

  return {
    totalEurPaid,
    totalUsdPaid,
    totalPlnPaid,
    totalEurNotPaid,
    totalUsdNotPaid,
    totalPlnNotPaid,
  };
}

const EUR_PLN = 4.7;
const USD_PLN = 4.5;

export default function DashboardMainStats({
  subscriptions,
}: {
  subscriptions:
    | (Subscription & {
        payments: Payment[];
      })[]
    | undefined;
}) {
  if (!subscriptions) {
    return <div>Loading . . .</div>;
  }

  const subscriptionsSum = summarizePrices(subscriptions);
  const paymentAmounts = summarizePaymentAmounts(subscriptions);
  const monthSumInPln =
    subscriptionsSum.totalEur * EUR_PLN +
    subscriptionsSum.totalUSD * USD_PLN +
    subscriptionsSum.totalPLN;

  const paidSum =
    paymentAmounts.totalEurPaid * EUR_PLN +
    paymentAmounts.totalUsdPaid * USD_PLN +
    paymentAmounts.totalPlnPaid;
  const stillToPaySum =
    paymentAmounts.totalEurNotPaid * EUR_PLN +
    paymentAmounts.totalUsdNotPaid * USD_PLN +
    paymentAmounts.totalPlnNotPaid;
  return (
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
        <div className="flex items-center gap-6">
          <SingleStatsComponent
            sum={stillToPaySum.toFixed(2)}
            subTitle="Still to pay"
          />
          <SingleStatsComponent
            sum={paidSum.toFixed(2)}
            subTitle="Already paid"
          />
          <SingleStatsComponent
            sum={monthSumInPln.toFixed(2)}
            subTitle="This month sum"
          />
        </div>
      </div>
    </div>
  );
}
