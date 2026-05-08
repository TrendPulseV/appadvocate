import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppAdvocate — Reviews That Mean Something",
  description: "We help developers earn 5 stars. Or get the feedback that tells them exactly why they didn't. A vetted advocacy network built on mutual respect.",
  metadataBase: new URL("https://appadvocate.io"),
  openGraph: {
    title: "AppAdvocate — Reviews That Mean Something",
    description: "We help developers earn 5 stars. Or get the feedback that tells them exactly why they didn't.",
    url: "https://appadvocate.io",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
