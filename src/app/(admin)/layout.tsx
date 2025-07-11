
import { AppSidebar } from "@/components/sidebar/SidebarComponent"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="grid grid-cols-[auto_1fr] h-screen mt-5 w-[100%]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
