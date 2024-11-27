import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Paper Deadline Countdown | AoE Time",
  description:
    "Track academic conference deadlines in Anywhere on Earth (AoE) timezone. Never miss a paper submission deadline again.",
  icons: {
    icon: [
      {
        url: "/images/deadline.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/deadline.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "academic conference",
    "paper deadline",
    "AoE time",
    "deadline tracker",
    "conference countdown",
    "paper submission",
    "academic deadlines",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Paper Deadline Countdown | AoE Time",
    description:
      "Track academic conference deadlines in Anywhere on Earth (AoE) timezone",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Deadline Countdown | AoE Time",
    description:
      "Track academic conference deadlines in Anywhere on Earth (AoE) timezone",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/images/deadline.png" />
        <link rel="apple-touch-icon" href="/images/deadline.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
