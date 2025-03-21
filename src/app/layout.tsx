import "./globals.css";
import Header from "@/components/header/Header";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="container mx-auto px-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
