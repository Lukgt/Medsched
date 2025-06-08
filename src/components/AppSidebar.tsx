
import { Home, Calendar, User, FileText, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import MedshedLogo from "@/assets/Medshed-line.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Início",
    url: "/home",
    icon: Home,
  },
  {
    title: "Agendar Consulta",
    url: "/agendamento",
    icon: Calendar,
  },
  {
    title: "Prontuários",
    url: "/prontuarios",
    icon: FileText,
  },
  {
    title: "Perfil",
    url: "/perfil",
    icon: User,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2 ">
          <div className="h-8 p-[4px] bg-[#0BADC9] rounded-lg flex items-center justify-center">
            <img src={MedshedLogo} alt="Logo" />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
