import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Edit, Mail, User } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatarPreview?: string;
  age?: string;
  userType?: string;
}

// Add the Appointment interface (same as in Agendamento.tsx)
interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string; // Added to match Agendamento.tsx, though not displayed in this version
  doctor: string;
  date: string; // Store as YYYY-MM-DD string
  time: string;
  symptoms: string; // Added to match Agendamento.tsx, though not displayed in this version
  status: "agendado" | "confirmado" | "cancelado";
  createdAt: string; // ISO string
}

const Perfil = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]); // State for user's appointments

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser) as UserProfile;
      setCurrentUserProfile({
        name: userData.name || "Nome não disponível",
        email: userData.email || "Email não disponível",
        avatarPreview: userData.avatarPreview,
        age: userData.age,
        userType: userData.userType
      });

      // Load and filter appointments
      const savedAppointments = localStorage.getItem("medsched_appointments");
      if (savedAppointments) {
        const allAppointments = JSON.parse(savedAppointments) as Appointment[];
        // Filter appointments for the current user by patientName
        // This assumes patientName in appointment matches the user's name
        const filteredAppointments = allAppointments.filter(
          (appointment) => appointment.patientName === userData.name
        );
        setUserAppointments(filteredAppointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }
    }
  }, []);

  // Fallback data or loading state if currentUserProfile is null
  const displayName = currentUserProfile?.name || "Carregando...";
  const displayEmail = currentUserProfile?.email || "Carregando...";
  const displayAvatar = currentUserProfile?.avatarPreview || "https://via.placeholder.com/150"; // Default placeholder image

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
                src={displayAvatar}
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
                <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                {currentUserProfile?.age && <p className="text-sm text-gray-600">Idade: {currentUserProfile.age} anos</p>}
                {currentUserProfile?.userType && <p className="text-sm text-gray-500 capitalize">{currentUserProfile.userType}</p>}
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>{displayEmail}</span>
                </div>
                {/* Phone and Address removed as they are not in localStorage from Auth.tsx */}
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
            {userAppointments.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {userAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-gray-800">
                        {appointment.doctor}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(appointment.date + 'T00:00:00').toLocaleDateString()} às {appointment.time}
                      </div>
                      {appointment.symptoms && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          Sintomas: {appointment.symptoms}
                        </p>
                      )}
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        appointment.status === "agendado"
                          ? "bg-blue-100 text-blue-800"
                          : appointment.status === "confirmado"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                Nenhuma consulta agendada
              </div>
            )}
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