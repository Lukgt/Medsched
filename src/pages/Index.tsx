import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import QuickActions from "@/components/QuickActions";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import SpecialtyGrid from "@/components/SpecialtyGrid";
import DoctorCard from "@/components/DoctorCard";

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredDoctors = featuredDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="hidden md:block">
        <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
      </div>

      <SearchBar onSearch={setSearchTerm} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <QuickActions />
          <SpecialtyGrid />
        </div>

        <div className="space-y-6">
          <UpcomingAppointments />
          <div className="py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Médicos em Destaque
            </h2>
            <div className="max-h-[400px] overflow-y-auto grid gap-4 pr-2">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
