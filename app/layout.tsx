import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import SliderTool from "@/components/slider-tool";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "热榜聚合 -  汇聚全网热点",
  description: "忙里偷闲",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={cn("select-none", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="flex flex-col gap-8 relative">
            <Header></Header>
            <main className="container pb-8 px-4 sm:px-20 flex gap-4 flex-col ">
              {children}
            </main>
          </div>
          <SliderTool />
          <Background />
          <Analytics />
          <Toaster />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
