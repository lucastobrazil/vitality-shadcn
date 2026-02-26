import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AppSidebar } from "./_components/app-sidebar";
import { MobileHeader } from "./_components/mobile-header";
import { CommandBar } from "./_components/command-bar";
import { SidebarProvider, SidebarInset } from "@/registry/vitality/ui/sidebar";
import { getComponents, getBlocks } from "@/lib/registry";

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
  const components = getComponents();
  const blocks = getBlocks();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <SidebarProvider>
            <AppSidebar components={components} blocks={blocks} />
            <SidebarInset>
              <MobileHeader />
              <div className="mx-auto w-full max-w-[1024px] px-6 py-10">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
          <CommandBar components={components} blocks={blocks} />
        </Providers>
      </body>
    </html>
  );
}
