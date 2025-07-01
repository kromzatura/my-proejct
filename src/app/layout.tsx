import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International App",
  description: "A modern internationalized Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
