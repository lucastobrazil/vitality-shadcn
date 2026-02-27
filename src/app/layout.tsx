import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AppSidebar } from "./_components/app-sidebar";
import { SiteHeader } from "./_components/site-header";
import { CommandBar } from "./_components/command-bar";
import { SidebarProvider } from "@/registry/vitality/ui/sidebar";
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
          <SidebarProvider
            className="flex-col"
            style={
              { "--sidebar-width": "16rem" } as React.CSSProperties
            }
          >
            <SiteHeader />
            <div className="mx-auto w-full max-w-[calc(var(--breakpoint-2xl)+2rem)] flex-1 px-2 lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]">
              <AppSidebar components={components} blocks={blocks} />
              <main className="min-w-0">
                <div className="w-full px-6 py-10">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
          <CommandBar components={components} blocks={blocks} />
        </Providers>
      </body>
    </html>
  );
}
