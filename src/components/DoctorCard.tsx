
import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  doctor: {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    location: string;
    availability: string;
    image: string;
    price: string;
  };
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
            {doctor.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{doctor.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{doctor.specialty}</p>
            
            <div className="flex items-center space-x-1 mb-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{doctor.rating}</span>
              <span className="text-sm text-gray-500">({doctor.reviews} avaliações)</span>
            </div>
            
            <div className="flex flex-col space-y-1 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{doctor.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{doctor.availability}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">
            <span className="text-gray-600">A partir de </span>
            <span className="font-semibold text-green-600">{doctor.price}</span>
          </div>
          <Button size="sm">Agendar</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
