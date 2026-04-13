import { useLocation, Link } from "wouter";
import {
  User,
  Play,
  Headphones,
  BookOpen,
  ImageIcon,
} from "lucide-react";
import { asset } from "@/lib/assets";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const contentItems = [
  { title: "My Book", url: "/", matchUrls: ["/", "/book"], icon: BookOpen },
  { title: "About JK", url: "/about", matchUrls: ["/about"], icon: User },
  { title: "Gallery", url: "/gallery", matchUrls: ["/gallery"], icon: ImageIcon },
  { title: "Reels", url: "/reels", matchUrls: ["/reels"], icon: Play },
  { title: "Podcasts", url: "/podcasts", matchUrls: ["/podcasts"], icon: Headphones },
];

export function AppSidebar() {
  const [location] = useLocation();

  const isActive = (matchUrls: string[]) => {
    return matchUrls.some(url => {
      if (url === "/") return location === "/";
      return location === url || location.startsWith(url + "/");
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/">
          <img
            src={asset("/images/branding/logo.png")}
            alt="The Sales Algorithm"
            className="h-16 w-auto"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-extrabold text-sm uppercase tracking-wider">Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => {
                const active = isActive(item.matchUrls);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span className="font-bold">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
