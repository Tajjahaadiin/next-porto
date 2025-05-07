import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import ThemeToggler from '../(marketing)/components/theme-toggler'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-full ">
        <aside>
          <AppSidebar />
        </aside>
        <main className="flex-1">
          <div className="flex  justify-between">
            <SidebarTrigger />
            <div className="flex justify-center items-center mr-3 mt-2 w-7 h-7 bg-gray-200 dark:bg-blue-900 shadow-md shadow-gray-400 dark:shadow-blue-400 rounded-md">
              <ThemeToggler />
            </div>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
