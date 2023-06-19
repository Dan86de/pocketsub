import AppNavLink from "@/components/AppNavLink";
import AppUserButton from "@/components/AppUserButton";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/img/Logo.png";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-full ${inter.className}`}>
      <aside className="flex w-64 flex-col justify-between">
        <div>
          <Link
            href={"/"}
            className="flex items-center justify-start gap-2 p-8"
          >
            <Image src={logo} alt="Pocketsub logo" height={34} />
            <h1 className="text-lg font-semibold">pocketsub</h1>
          </Link>
          <nav className="flex flex-col">
            <AppNavLink
              href={"/dashboard"}
              iconName="dashboard"
              text="Dashboard"
            />
            <AppNavLink
              href={"/subscriptions"}
              iconName="file-text"
              text="Subscriptions"
            />
          </nav>
        </div>
        <AppUserButton />
      </aside>
      <main className="max-h-screen grow overflow-hidden bg-zinc-200">
        {children}
      </main>
    </div>
  );
}
