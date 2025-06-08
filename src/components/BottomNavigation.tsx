import { Home, Calendar, Search, User, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Início", path: "/home" },
    { icon: Search, label: "Buscar", path: "/NotFound" },
    { icon: Calendar, label: "Agendar", path: "/agendamento" },
    { icon: MessageCircle, label: "Mensagens", path: "/prontuarios" },
    { icon: User, label: "Perfil", path: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center space-y-1 py-2 px-1 ${
              location.pathname === item.path
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
