import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Agendamento from "./pages/Agendamento";
import Auth from "./pages/Auth";
import Prontuarios from "./pages/Prontuarios";
import BottomNavigation from "@/components/BottomNavigation";
import Perfil from "./pages/Perfil";
import MedshedLogo from "@/assets/Medshed-line.svg";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isAuthPage && <AppSidebar />}
        <SidebarInset className="flex-1">
          {!isAuthPage && (
            <header className="flex bg-[#0BADC9] h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden">
              <SidebarTrigger className="-ml-1 text-white" />
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center">
                  <img src={MedshedLogo} alt="Logo" />
                </div>
              </div>
            </header>
          )}
          <main className="flex-1">
            <Routes>
              <Route path="/home" element={<Index />} />
              <Route path="/agendamento" element={<Agendamento />} />
              <Route path="/prontuarios" element={<Prontuarios />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {!isAuthPage && (
            <div className="md:hidden">
              <BottomNavigation />
            </div>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
