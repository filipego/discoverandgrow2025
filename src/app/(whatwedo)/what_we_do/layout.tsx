import type { Metadata } from "next";
import "../../globals.css";
import { createClient } from "@/prismicio";
import { Header } from "@/app/components/Header";
import Footer from "@/app/components/Footer";



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
export default function ProgramsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body

            >
                <main>
                    <Header />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
