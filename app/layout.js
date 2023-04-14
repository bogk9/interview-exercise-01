import { Providers } from "@/redux/provider";
import { persistor } from "@/redux/store";
import Script from "next/script";
import { PersistGate } from "@/redux/persist";
import "./globals.css";

export const metadata = {
  title: "Planetary API",
  description: "API fetching footage from NASA's planetary missions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Providers>
      </body>
      <Script src="https://kit.fontawesome.com/a52350ab80.js" />
    </html>
  );
}
