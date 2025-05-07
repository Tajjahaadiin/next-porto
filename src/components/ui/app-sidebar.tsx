import { Briefcase, FileStack, FolderKanban, LogOut, User } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'

// Menu items.
const items = [
  {
    title: 'User',
    url: '/user',
    icon: User,
  },
  {
    title: 'Techstack',
    url: '/techstacks',
    icon: FileStack,
  },
  {
    title: 'Experiences',
    url: '/experiences',
    icon: Briefcase,
  },
  {
    title: 'Project',
    url: '/projects',
    icon: FolderKanban,
  },
  {
    title: 'logout',
    url: '/logout',
    icon: LogOut,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold">
            <Link href={'/dashboard'}>Dashboard</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
