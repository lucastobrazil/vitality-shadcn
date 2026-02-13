import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"
import { AppSidebar } from "./_components/app-sidebar"
import { CommandBar } from "./_components/command-bar"

export const metadata: Metadata = {
  title: "Vitality — shadcn/ui Component Registry",
  description: "A self-hosted shadcn/ui component registry with custom Vitality theme components.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="flex min-h-svh">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-2xl px-6 py-10">
                {children}
              </div>
            </main>
          </div>
          <CommandBar />
        </Providers>
      </body>
    </html>
  )
}
