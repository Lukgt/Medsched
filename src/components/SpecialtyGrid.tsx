
import { Heart, Eye, Brain, Bone, Baby, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SpecialtyGrid = () => {
  const specialties = [
    {
      icon: Heart,
      name: "Cardiologia",
      doctors: 45,
      color: "bg-red-50 text-red-600 border-red-200"
    },
    {
      icon: Eye,
      name: "Oftalmologia",
      doctors: 32,
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      icon: Brain,
      name: "Neurologia",
      doctors: 28,
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      icon: Bone,
      name: "Ortopedia",
      doctors: 38,
      color: "bg-orange-50 text-orange-600 border-orange-200"
    },
    {
      icon: Baby,
      name: "Pediatria",
      doctors: 42,
      color: "bg-pink-50 text-pink-600 border-pink-200"
    },
    {
      icon: Stethoscope,
      name: "Clínica Geral",
      doctors: 65,
      color: "bg-green-50 text-green-600 border-green-200"
    }
  ];

  return (
    <div className="px-4 py-6 md:px-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Especialidades</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {specialties.map((specialty, index) => (
          <Card key={index} className={`hover:shadow-md transition-shadow cursor-pointer border-2 ${specialty.color}`}>
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full ${specialty.color} flex items-center justify-center mx-auto mb-2`}>
                <specialty.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">{specialty.name}</h3>
              <p className="text-xs text-gray-600">{specialty.doctors} médicos</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyGrid;
