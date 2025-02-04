"use client"

import * as React from "react"
import {
  Home,
  ChartArea,
  Package,
  Calendar,
  Settings,
  PackagePlus,
  Pencil,
  PackageX,
} from "lucide-react"
import { NavMain } from "@/components/layout/sidebar/nav-main"
import { NavUser } from "@/components/layout/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

const data = {
  user: {
    name: "Manuel Barreiro",
    email: "manuel.barreiro@ar.nestle.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Analytics",
      icon: ChartArea,
      isActive: true,
    },
    {
      title: "Productos",
      icon: Package,
      url: "/productos",
      items: [
        {
          title: "Evaluaciones",
          icon: Calendar,
          url: "/productos/evaluaciones",
        },
        {
          title: "Cargar Nuevo",
          icon: PackagePlus,
          url: "/productos/nuevo",
        },
        {
          title: "Modificar Existente",
          icon: Pencil,
          url: "/productos/evaluaciones",
        },
        {
          title: "Descontinuar",
          icon: PackageX,
          url: "/productos/evaluaciones",
        },
      ],
    },

    {
      title: "Configuración",
      icon: Settings,
      url: "/configuracion",
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src={"/nestleLogo.png"}
                    alt="Nestlé Logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-nestleBrush text-lg font-medium">
                    Product Life-cycle
                  </span>
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/mexicoFlag.svg"}
                      alt="Mexico Flag"
                      width={15}
                      height={15}
                    />
                    <span className="truncate font-nestleText text-xs font-medium">
                      México
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
