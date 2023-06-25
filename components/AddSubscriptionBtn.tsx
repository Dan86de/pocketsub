"use client";
import { addSubscription } from "@/app/(application)/actions";
import { ClerkLoading, useUser } from "@clerk/nextjs";
import {
  SUBSCRIPTION_BILLING_PERIOD,
  SUBSCRIPTION_CURRENCY,
} from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";

export default function AddSubscriptionBtn() {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>("Entertainment");
  const [avatarURL, setAvatarURL] = useState<string>(
    "https://dsc.cloud/88160a/Google-Avatar.png"
  );
  const [cost, setCost] = useState<number>(0);
  const [currency, setCurrency] = useState<SUBSCRIPTION_CURRENCY>(
    SUBSCRIPTION_CURRENCY.EUR
  );
  const [billingPeriod, setBillingPeriod] = useState<string>(
    SUBSCRIPTION_BILLING_PERIOD.MONTHLY
  );
  const [nextPayment, setNextPayment] = useState<string>();

  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: addSubscription,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dashboardData"] });
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  if (!user) return <ClerkLoading />;

  return (
    <div>
      <p className="text-centerw mb-2">Add new subscription?</p>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <Dialog.Trigger>
          <button className="flex items-center rounded-lg bg-zinc-900 py-3 pl-4 pr-6 text-zinc-50">
            <i className="ri-add-line text-2xl" />
            New subscription
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-zinc-950 bg-opacity-80 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-10 max-h-[85vh] w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-zinc-50 p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="text-2xl font-medium">
              Add new subscription
            </Dialog.Title>
            <Dialog.Description className="mb-4 mt-5 font-medium">
              General information
            </Dialog.Description>
            <form action="">
              <div className="flex items-center gap-4">
                <div className="w-1/2">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-[2px] text-sm font-light text-zinc-600"
                  >
                    Name
                    <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Subscription name"
                    className="block w-full rounded-md border-0 bg-zinc-200 p-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="category"
                    className="flex items-center gap-[2px] text-sm font-light text-zinc-600"
                  >
                    Category
                    <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      className=" block w-full appearance-none rounded-md border-0 bg-zinc-200 p-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option selected value="Entertainment">
                        Entertainment
                      </option>
                      <option value="Insurance">Insurance</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-400"></i>
                  </div>
                </div>
              </div>

              <label
                htmlFor="avat_url"
                className="flex items-center gap-[2px] pb-2 text-sm font-light text-zinc-600"
              >
                Avatar URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="avatar_url"
                  id="avatar_url"
                  placeholder="google.com"
                  className="block w-full rounded-md border-0 bg-zinc-200 pb-2 pl-20 pt-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300  placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                  value={avatarURL}
                  onChange={(e) => setAvatarURL(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center rounded-md rounded-r-none bg-zinc-400 p-2">
                  https://
                </div>
              </div>
              <p className="pt-1 text-[10px] font-light text-zinc-700">
                Giving information about webpage you will help us
                generate proper avatar for your service.
              </p>
              <Dialog.Description className="mb-4 mt-5 font-medium">
                Expense information
              </Dialog.Description>
              <label
                htmlFor="cost"
                className="flex items-center gap-[2px] pb-2 text-sm font-light text-zinc-600"
              >
                Cost
                <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.01"
                  name="cost"
                  id="cost"
                  className="block w-full rounded-md border-0 bg-zinc-200 p-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                  value={cost}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      setCost(parseFloat(value.toFixed(2)));
                    }
                  }}
                />
                <select
                  name="currency"
                  id="currency"
                  className="absolute inset-y-0 right-0 block appearance-none rounded-md rounded-l-none border-0 bg-zinc-400 p-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                  value={currency}
                  onChange={(e) =>
                    setCurrency(
                      e.target.value as SUBSCRIPTION_CURRENCY
                    )
                  }
                >
                  <option value={SUBSCRIPTION_CURRENCY.EUR}>
                    EUR
                  </option>
                  <option value={SUBSCRIPTION_CURRENCY.USD}>
                    USD
                  </option>
                  <option value={SUBSCRIPTION_CURRENCY.PLN}>
                    PLN
                  </option>
                </select>
              </div>

              <Dialog.Description className="mb-4 mt-5 font-medium">
                Billing information
              </Dialog.Description>
              <div className="flex items-center gap-4">
                <div className="w-1/2">
                  <label
                    htmlFor="billing_period"
                    className="flex items-center gap-[2px] pb-2 text-sm font-light text-zinc-600"
                  >
                    Billing period
                  </label>
                  <div className="relative">
                    <select
                      name="billing_period"
                      id="billing_period"
                      className=" block w-full appearance-none rounded-md border-0 bg-zinc-200 p-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                      value={billingPeriod}
                      onChange={(e) =>
                        setBillingPeriod(e.target.value)
                      }
                    >
                      <option
                        selected
                        value={SUBSCRIPTION_BILLING_PERIOD.MONTHLY}
                      >
                        MONTHLY
                      </option>
                      <option
                        value={SUBSCRIPTION_BILLING_PERIOD.QUARTERLY}
                      >
                        QUARTERLY
                      </option>
                      <option
                        value={SUBSCRIPTION_BILLING_PERIOD.YEARLY}
                      >
                        YEARLY
                      </option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-400"></i>
                  </div>
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="next_payment"
                    className="flex items-center gap-[2px] pb-2 text-sm font-light text-zinc-600"
                  >
                    Next payment
                  </label>
                  <input
                    type="date"
                    className="block w-full rounded-md border-0 bg-zinc-200 p-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                    value={nextPayment}
                    min={format(new Date(), "yyyy-MM-dd")}
                    onChange={(e) => setNextPayment(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-10 flex flex-col justify-center gap-4">
                <Dialog.Close asChild>
                  <button className="flex w-full items-center justify-center rounded-lg border-[1px] border-zinc-500 p-4 font-medium leading-none">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!nextPayment) return;
                    mutation.mutate({
                      name,
                      category,
                      avatar_url: avatarURL,
                      billing_period: billingPeriod,
                      currency,
                      nextPayment,
                      price: cost,
                      userId: user.id,
                    });

                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-center rounded-lg bg-zinc-900 p-4 font-medium leading-none text-zinc-100"
                >
                  Add new subscription
                </button>
              </div>
            </form>
            <Dialog.Close asChild>
              <button
                className="absolute right-[16px] top-[24px] inline-flex items-center justify-center rounded-full px-2 shadow-zinc-950 focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <i className="ri-close-line text-2xl text-zinc-950"></i>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
