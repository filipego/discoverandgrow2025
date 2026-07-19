import type { Metadata } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import "../globals.css";

import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { HashFocusHandler } from "../components/HashFocusHandler";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});


export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.title,
    description: settings.data.meta_description,
    openGraph: {
      images: settings.data.fallback_og_image.url ?? undefined,
    },
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${openSans.variable} ${raleway.variable}`}
      >
        <main>
          <HashFocusHandler />
          <Header />
          <div className="pt-24">
            {children}
          </div>
          <Footer />
        </main>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
