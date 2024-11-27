import localFont from "next/font/local";
import "./globals.css";

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
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
