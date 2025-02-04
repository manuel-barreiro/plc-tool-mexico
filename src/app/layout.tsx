import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { cookies } from "next/headers"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppBreadcrumbs from "@/components/layout/AppBreadcrumbs"
import ThemeToggle from "@/components/theme/ThemeToggle"

const nestleBrush = localFont({
  src: "../../assets/fonts/NestleBrush-Regular.ttf",
  variable: "--font-nestle-brush",
})
const nestleScript = localFont({
  src: "../../assets/fonts/NestleScriptOfficeEUR-Regular.ttf",
  variable: "--font-nestle-script",
})
const nestleText = localFont({
  src: "../../assets/fonts/NestleTextTF-Book.ttf",
  variable: "--font-nestle-text",
})

export const metadata: Metadata = {
  title: "Product Life Cycle Tool",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  return (
    <html lang="en">
      <body
        className={`${nestleBrush.variable} ${nestleText.variable} ${nestleScript.variable} font-nestleText antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <AppBreadcrumbs />
                </div>
                <ThemeToggle />
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
