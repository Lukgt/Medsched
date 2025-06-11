import { Calendar, Search, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Calendar,
      title: "Agendar",
      subtitle: "Nova consulta",
      color: "bg-blue-50 text-blue-600",
      borderColor: "border-blue-200",
      path: "/agendamento"
    },
    {
      icon: Search,
      title: "Buscar",
      subtitle: "Médicos",
      color: "bg-green-50 text-green-600",
      borderColor: "border-green-200",
      path: "/medicos"
    },
    {
      icon: Clock,
      title: "Horários",
      subtitle: "Disponíveis",
      color: "bg-purple-50 text-purple-600",
      borderColor: "border-purple-200",
      path: "/horarios"
    },
    {
      icon: MapPin,
      title: "Localizar",
      subtitle: "Clínicas",
      color: "bg-orange-50 text-orange-600",
      borderColor: "border-orange-200",
      path: "/clinicas"
    }
  ];

  const handleActionClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="px-4 py-6 md:px-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-md transition-shadow cursor-pointer border-2 ${action.borderColor}`}
            onClick={() => handleActionClick(action.path)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-2`}>
                <action.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{action.title}</h3>
              <p className="text-xs text-gray-600">{action.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
