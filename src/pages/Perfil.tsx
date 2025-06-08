import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Edit, User, Mail, Phone, MapPin } from "lucide-react";

const Perfil = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const userData = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    foto: "https://randomuser.me/api/portraits/men/1.jpg"
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="hidden md:block">
        <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="relative">
              <img
                src={userData.foto}
                alt="Foto do perfil"
                className="w-32 h-32 rounded-full object-cover"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-white"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{userData.nome}</h1>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span>{userData.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{userData.endereco}</span>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full md:w-auto">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Minhas Consultas
            </h2>
            {/* Área para lista de consultas */}
            <div className="text-gray-500 text-center py-8">
              Nenhuma consulta agendada
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Histórico Médico
            </h2>
            {/* Área para histórico médico */}
            <div className="text-gray-500 text-center py-8">
              Nenhum registro encontrado
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil;