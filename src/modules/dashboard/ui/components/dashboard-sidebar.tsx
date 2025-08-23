"use client";

import Link from "next/link";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import  { DashboardUserButton } from "./dashboard-user-button";
import{
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader, 
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,

     
} from "@/components/ui/sidebar";



const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },

    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    },
];


const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/Upgrade",
    },   
]

export const DashboardSidebar = () => {
    const pathname = usePathname(); 


    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                   <Image  src= "/logo.svg"  height={36} width={36} alt="Meet.AI"/>
                   <p className="text-2xl font-sembold">Meet.AI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5d6b68]" />    
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuButton key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "h-10 hover:bg-liner-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                    
                                        pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                                    )}
                                    isActive={pathname === item.href}
                                        >
                                        <Link href={item.href}>
                                        <item.icon  className="size-5"/>
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuButton>
                            )
                        )
                            
                            }

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5d6b68]" />    
            </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuButton key={item.href}>
                                    <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "h-10 hover:bg-liner-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                    
                                        pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                                    )}
                                    isActive={pathname === item.href}
                                        >
                                        <Link href={item.href}>
                                        <item.icon  className="size-5"/>
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuButton>
                            )
                        )
                            
                            }

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                

            </SidebarContent>
            <SidebarFooter className = "tect-white">
            <DashboardUserButton/>

            </SidebarFooter>
        </Sidebar>
    )
}