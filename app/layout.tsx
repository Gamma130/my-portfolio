import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { AskProvider } from "./context/AskContext";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plexMono.variable} ${plexSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <div className="shell">
          <AskProvider>{children}</AskProvider>
        </div>
      </body>
    </html>
  );
}
