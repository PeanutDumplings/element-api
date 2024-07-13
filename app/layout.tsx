import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Elements API",
    description: "Fetch information about the elements in the periodic table",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <meta property="theme-color" content="#1d1231" />
            <body className={inter.className}>{children}</body>
        </html>
    );
}
