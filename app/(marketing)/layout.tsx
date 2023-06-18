import Link from "next/link";
import logo from "../../public/img/Logo.png";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="mx-auto flex max-w-7xl items-center p-6">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={logo} alt="Pocketsub logo" height={34} />
          <h1 className="text-xl font-bold">Pocketsub</h1>
        </Link>
        <nav className="w-full">
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
}
