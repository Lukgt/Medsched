import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import QuickActions from "@/components/QuickActions";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import SpecialtyGrid from "@/components/SpecialtyGrid";
import DoctorCard from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";
import { Calendar, UserPlus, FileText } from "lucide-react";

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Maria Silva",
      specialty: "Cardiologista",
      rating: 4.9,
      reviews: 127,
      location: "Hospital São Paulo - SP",
      availability: "Disponível hoje",
      image: "",
      price: "R$ 280",
    },
    {
      id: 2,
      name: "Dr. João Santos",
      specialty: "Dermatologista",
      rating: 4.8,
      reviews: 89,
      location: "Clínica Derma - RJ",
      availability: "Próximo horário: 15:30",
      image: "",
      price: "R$ 320",
    },
    {
      id: 3,
      name: "Dr. Ana Costa",
      specialty: "Pediatra",
      rating: 5.0,
      reviews: 203,
      location: "Hospital Infantil - MG",
      availability: "Disponível amanhã",
      image: "",
      price: "R$ 250",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="hidden md:block">
        <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
      </div>

      {/* Barra de navegação rápida - melhorada para mobile */}

      <main className="max-w-7xl mx-auto">
        <SearchBar />
        <QuickActions />
        <UpcomingAppointments />
        <SpecialtyGrid />

        <div className="px-4 py-6 md:px-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Médicos em Destaque
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
