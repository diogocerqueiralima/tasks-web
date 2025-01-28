import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";

const roboto = Roboto({
  variable: "--roboto",
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: "Tasks",
  description: "Tasks Web interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body className={`${roboto.variable}`}>

        <div className="content">

          <Header />

          {children}

        </div>

      </body>

    </html>
  );
}
