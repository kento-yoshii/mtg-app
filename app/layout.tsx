import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <h1>Magic: The Gathering カード検索</h1>
        {children}
      </body>
    </html>
  );
}



