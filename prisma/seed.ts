import { prisma } from "@/lib/db";
import {
  PAYMENT_STATUS,
  SUBSCRIPTION_BILLING_PERIOD,
  SUBSCRIPTION_CURRENCY,
} from "@prisma/client";
import {
  addMonths,
  endOfMonth,
  isBefore,
  startOfMonth,
} from "date-fns";

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() +
      Math.random() * (end.getTime() - start.getTime())
  );
}

function getRandomDateInCurrentMonth() {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  return new Date(
    start.getTime() +
      Math.random() * (end.getTime() - start.getTime())
  );
}

function nextPaymentMonthGenerator(
  billingPeriod: SUBSCRIPTION_BILLING_PERIOD
) {
  switch (billingPeriod) {
    case SUBSCRIPTION_BILLING_PERIOD.QUARTERLY:
      return 3;
    case SUBSCRIPTION_BILLING_PERIOD.YEARLY:
      return 12;
    default:
      return 1;
  }
}

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "daniel.noworyta@gmail.com",
    },
    update: {
      subscriptions: {
        create: [
          {
            name: "Google Cloud",
            category: "Infrastructure tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Google-Avatar.png",
            price: 5.2,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Disney+",
            category: "Entertainment",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Disney-Avatar.png",
            price: 8.99,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Getsafe Digital GmbH",
            category: "Insurance",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Getsafe-Avatar.png",
            price: 4.84,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Zapier",
            category: "Productivity tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Zapier-Avatar.png",
            price: 29.99,
            currency: SUBSCRIPTION_CURRENCY.USD,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Spotify",
            category: "Entertainment",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Spotify-Avatar.png",
            price: 9.99,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Google payment",
            category: "Infrastructure tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Google-Avatar.png",
            price: 10.79,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Github",
            category: "Developer tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Github-Avatar.png",
            price: 2.9,
            currency: SUBSCRIPTION_CURRENCY.USD,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Google payment",
            category: "Infrastructure tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Google-Avatar.png",
            price: 4.99,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Sizzy Solo",
            category: "Developer tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Sizzy-Avatar.png",
            price: 7.0,
            currency: SUBSCRIPTION_CURRENCY.USD,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },

          {
            name: "Medium",
            category: "Entertainment",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Medium-Avatar.png",
            price: 5.0,
            currency: SUBSCRIPTION_CURRENCY.USD,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Netflix",
            category: "Entertainment",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Netflix-Avatar.png",
            price: 12.99,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
        ],
      },
    },
    create: {
      id: "test123",
      email: "daniel.noworyta@gmail.com",
      name: "Daniel Noworyta",
      subscriptions: {
        create: [
          {
            name: "Google Cloud",
            category: "Infrastructure tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Google-Avatar.png",
            price: 5.2,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Disney+",
            category: "Entertainment",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Disney-Avatar.png",
            price: 8.99,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Getsafe Digital GmbH",
            category: "Insurance",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Getsafe-Avatar.png",
            price: 4.84,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Zapier",
            category: "Productivity tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Zapier-Avatar.png",
            price: 29.99,
            currency: SUBSCRIPTION_CURRENCY.USD,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Spotify",
            category: "Entertainment",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Spotify-Avatar.png",
            price: 9.99,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Google payment",
            category: "Infrastructure tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Google-Avatar.png",
            price: 10.79,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Github",
            category: "Developer tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Github-Avatar.png",
            price: 2.9,
            currency: SUBSCRIPTION_CURRENCY.USD,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Google payment",
            category: "Infrastructure tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Google-Avatar.png",
            price: 4.99,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Sizzy Solo",
            category: "Developer tools",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Sizzy-Avatar.png",
            price: 7.0,
            currency: SUBSCRIPTION_CURRENCY.USD,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },

          {
            name: "Medium",
            category: "Entertainment",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Medium-Avatar.png",
            price: 5.0,
            currency: SUBSCRIPTION_CURRENCY.USD,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
          {
            name: "Netflix",
            category: "Entertainment",
            billing_period: SUBSCRIPTION_BILLING_PERIOD.MONTHLY,
            avatar_url: "https://dsc.cloud/88160a/Netflix-Avatar.png",
            price: 12.99,
            currency: SUBSCRIPTION_CURRENCY.EUR,
            start_date: randomDate(new Date(2023, 1, 1), new Date()),
            next_payment_date: new Date(),
          },
        ],
      },
    },
    include: {
      subscriptions: true,
    },
  });

  const updateSubscriptions = await Promise.all(
    user.subscriptions.map(async (subscription) => {
      const due_date = getRandomDateInCurrentMonth();
      const status = isBefore(due_date, new Date())
        ? PAYMENT_STATUS.PAID
        : PAYMENT_STATUS.NOT_PAID;

      await prisma.payment.create({
        data: {
          amount: subscription.price,
          due_date,
          subscriptionId: subscription.id,
          status,
        },
      });

      return prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          next_payment_date:
            status === PAYMENT_STATUS.PAID
              ? addMonths(
                  due_date,
                  nextPaymentMonthGenerator(
                    subscription.billing_period
                  )
                )
              : due_date,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
