import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Pocketsub",
  description: "Manage your payments with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="h-screen text-zinc-950">{children}</body>
      </html>
    </ClerkProvider>
  );
}
