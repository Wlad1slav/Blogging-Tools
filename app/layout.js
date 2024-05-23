import { Inter } from "next/font/google";

import "./stylesheet/app.scss";

import {Header} from "./components/header/Header";

import {metadata} from "@/app/metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <head>
              <title>{metadata.title}</title>
              <link rel="icon" href="/favicon.ico" />
          </head>

          <body className={inter.className}>
              <Header />
              {children}
          </body>
      </html>
  );
}
