import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import Error from "./error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import NavbarWrapper from "@/components/header/NavbarWrapper";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const suwannaphum = localFont({
  src: [
    {
      path: '../../public/fonts/Suwannaphum-Black.ttf',
      weight: '900',
      style: 'black',
    },
    {
      path: '../../public/fonts/Suwannaphum-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/Suwannaphum-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Suwannaphum-Light.ttf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/Suwannaphum-Thin.ttf',
      weight: '100',
      style: 'thin',
    }
  ],
  variable: "--font-suwannaphum",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Home | FullStack Morning",
  description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
  keywords: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Geist UI",
    "FullStack Morning",
    "Web Development",
    "React",
    "Frontend Development",
  ],
  openGraph: {
    title: "Home | FullStack Morning",
    description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
    url: "https://fullstack-nextjs-morning.vercel.app/",
    siteName: "FullStack Morning",
    images: "https://media.licdn.com/dms/image/v2/C5612AQFxx3XzXO9Vew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1583841493429?e=2147483647&v=beta&t=nOghzOBbkw7pVweJUyiUzSYZtqz8l5EPsdHcnWvy-DU",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | FullStack Morning",
    description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
    images: "",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} ${suwannaphum.variable} antialiased`}
      >
        <ErrorBoundary errorComponent={Error}>
          <NavbarWrapper />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
