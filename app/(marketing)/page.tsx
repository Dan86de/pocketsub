import Link from "next/link";
import heroImg from "../../public/img/hero_mock.png";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl">
        <h2 className="mx-auto mb-6 mt-10 max-w-3xl text-center text-5xl font-bold">
          Easiest way to manage your payments.
        </h2>
        <h3 className="mx-auto max-w-3xl text-center text-xl font-medium text-zinc-700">
          Keep all your payments organized and easily accessible with
          PocketSub&apos;s simple and convenient tracking system,
          designed to help you stay on top of your finances.
        </h3>
        <Link
          href={"/sign-up/"}
          className="mx-auto mt-4 flex max-w-[240px] items-center justify-center rounded-lg bg-zinc-900 px-12 py-3 font-semibold tracking-wide text-zinc-100"
        >
          Get Pocketsub
        </Link>
        <Image
          src={heroImg}
          alt="Hero image"
          className="mx-auto mt-10 px-4"
        />
      </section>
      <section className="mx-auto max-w-7xl">
        <p className="mt-20 text-center text-xs font-bold uppercase tracking-[2.4px] text-zinc-500">
          what is pocketsub?
        </p>
        <h2 className="mx-auto mb-6 mt-4 max-w-2xl text-center text-3xl font-bold">
          Pocketsub redefines the way you manage recurring payments.
        </h2>
        <h3 className="mx-auto max-w-2xl text-center text-zinc-700">
          Instead of relying on manual methods such as spreadsheets or
          individual subscription accounts, Pocketsub provides a
          streamlined and user-friendly platform that enables users to
          easily track and manage all their recurring payments and
          subscriptions in one place.
        </h3>
      </section>
    </>
  );
}
