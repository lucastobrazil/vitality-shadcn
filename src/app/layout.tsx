import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AppSidebar } from "./_components/app-sidebar";
import { MobileHeader } from "./_components/mobile-header";
import { CommandBar } from "./_components/command-bar";
import { SidebarProvider, SidebarInset } from "@/registry/vitality/ui/sidebar";

export const metadata: Metadata = {
  title: "Vitality — shadcn/ui Component Registry",
  description:
    "A self-hosted shadcn/ui component registry with custom Vitality theme components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <MobileHeader />
              <div className="mx-auto w-full max-w-[1024px] px-6 py-10">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
          <CommandBar />
        </Providers>
      </body>
    </html>
  );
}
