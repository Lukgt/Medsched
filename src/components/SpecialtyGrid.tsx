import { Heart, Eye, Brain, Bone, Baby, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const SpecialtyGrid = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 640
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (!mobile) setShowAll(false); // Reset showAll ao sair do mobile
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const specialties = [
    {
      icon: Heart,
      name: "Cardiologia",
      doctors: 45,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      icon: Eye,
      name: "Oftalmologia",
      doctors: 32,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: Brain,
      name: "Neurologia",
      doctors: 28,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      icon: Bone,
      name: "Ortopedia",
      doctors: 38,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      icon: Baby,
      name: "Pediatria",
      doctors: 42,
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
    {
      icon: Stethoscope,
      name: "Clínica Geral",
      doctors: 65,
      color: "bg-green-50 text-green-600 border-green-200",
    },
  ];

  const visibleSpecialties =
    isMobile && !showAll ? specialties.slice(0, 2) : specialties;

  return (
    <div className="px-2 py-4 md:px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Especialidades
        </h2>
        {isMobile && specialties.length > 2 && (
          !showAll ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(true)}
            >
              Ver mais
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(false)}
            >
              Ver menos
            </Button>
          )
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {visibleSpecialties.map((specialty, index) => (
          <Card
            key={index}
            className={`hover:shadow-md transition-shadow cursor-pointer border-2 ${specialty.color} min-h-[100px] h-32 flex flex-row items-center`}
          >
            <CardContent className="flex flex-col items-center h-full w-full p-4 gap-4">
              <div
                className={`w-14 h-14 rounded-full ${specialty.color} flex items-center justify-center`}
              >
                <specialty.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-base mb-1">
                  {specialty.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {specialty.doctors} médicos
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyGrid;
