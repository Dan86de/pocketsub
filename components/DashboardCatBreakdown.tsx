import { Payment, Subscription } from "@prisma/client";

interface DashboardCatBreakdownProps {
  data:
    | (Subscription & {
        payments: Payment[];
      })[];
}

export default function DashboardCatBreakdown({
  data,
}: DashboardCatBreakdownProps) {
  const exchangeRates: Record<string, number> = {
    EUR: 4.7,
    USD: 4.5,
    PLN: 1,
  };

  function sumPricesByCategory(data: Subscription[]) {
    return data.reduce((acc: Record<string, number>, item) => {
      // Convert to base currency if necessary
      let price =
        item.currency in exchangeRates
          ? item.price * exchangeRates[item.currency]
          : item.price;

      // Add the price to the correct category
      if (item.category in acc) {
        acc[item.category] += price;
      } else {
        acc[item.category] = price;
      }

      return acc;
    }, {});
  }

  const result = Object.entries(sumPricesByCategory(data)).map(
    ([name, price]) => ({
      name,
      price,
    })
  );

  function findCheapestAndMostExpensive(
    data: {
      name: string;
      price: number;
    }[]
  ) {
    const result = data.reduce(
      (acc, curr) => {
        if (curr.price > acc.mostExpensive.price) {
          acc.mostExpensive = curr;
        }
        if (curr.price < acc.cheapest.price) {
          acc.cheapest = curr;
        }
        return acc;
      },
      { mostExpensive: data[0], cheapest: data[0] }
    );

    return result;
  }

  const { mostExpensive, cheapest } =
    findCheapestAndMostExpensive(result);

  return (
    <div className="row-span-2 hidden flex-col rounded-xl bg-zinc-50 p-6 xl:flex">
      <h2 className="text-lg font-semibold">Category breakdown</h2>
      <div className="relative mt-2 w-full grow">
        <div className="absolute bottom-0 left-0 right-0 top-0 -mx-6 h-full">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 bg-zinc-50 px-6 py-2 text-left text-sm font-light text-zinc-400">
                  Category
                </th>
                <th className="border-b border-zinc-300 bg-zinc-50 px-6 py-2 text-right text-sm font-light text-zinc-400">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {result.map((categoryData) => {
                return (
                  <tr key={categoryData.name}>
                    <td className="whitespace-nowrap px-6 py-3 text-sm">
                      <p>{categoryData.name}</p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-right font-semibold">
                      {categoryData.price.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Most expensive category
          </h3>
          <div className="flex items-center justify-between">
            <h4 className="text-sm">{mostExpensive.name}</h4>
            <p className="font-semibold text-zinc-950">
              {mostExpensive.price.toFixed(2)}
              <span className="ml-1 font-semibold uppercase">
                pln
              </span>
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Cheapest category
          </h3>
          <div className="flex items-center justify-between">
            <h4 className="text-sm">{cheapest.name}</h4>
            <p className="font-semibold text-zinc-950">
              {cheapest.price.toFixed(2)}
              <span className="ml-1 font-semibold uppercase">
                pln
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
