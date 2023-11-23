import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./sidebar/page";

const poppins = localFont({
  src: [
    {
      path: "../app/fonts/poppins-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/fonts/poppins-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/poppins-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/poppins-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rohan Lakhani",
  description: "Rohan Lakhani Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="../app/favicon.png"
        />
        <title>Rohan Lakhani</title>
      </head>
      <body className={poppins.variable}>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/3666/3666226.png"/>
        <div className="content_wrapper">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
