
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  doctor: string;
  date: string;
  time: string;
  symptoms: string;
  status: 'agendado' | 'confirmado' | 'cancelado';
  createdAt: string;
}

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const savedAppointments = localStorage.getItem('medsched_appointments');
    if (savedAppointments) {
      const parsed = JSON.parse(savedAppointments);
      // Filtrar apenas consultas futuras e não canceladas
      const upcomingAppointments = parsed.filter((appointment: Appointment) => {
        const appointmentDate = new Date(appointment.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return appointmentDate >= today && appointment.status !== 'cancelado';
      });
      setAppointments(upcomingAppointments);
    }
  }, []);

  return (
    <div className="px-4 py-6 md:px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Próximas Consultas</h2>
        <Button variant="outline" size="sm">Ver todas</Button>
      </div>
      
      <div className="space-y-3">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-center text-gray-500">
              <p>Nenhuma consulta agendada</p>
            </CardContent>
          </Card>
        ) : (
          appointments
            .sort((a, b) => {
              const dateA = new Date(`${a.date}T${a.time}`);
              const dateB = new Date(`${b.date}T${b.time}`);
              return dateA.getTime() - dateB.getTime();
            })
            .slice(0, 3)
            .map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                      <p className="text-sm text-gray-600">Paciente: {appointment.patientName}</p>
                    </div>
                    <Badge 
                      variant={appointment.status === "confirmado" ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {appointment.status === "confirmado" ? "Confirmado" : "Agendado"}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Clínica São Paulo</span>
                    </div>
                  </div>
                  
                  {appointment.symptoms && (
                    <div className="text-xs text-gray-500 mb-3">
                      <strong>Motivo:</strong> {appointment.symptoms}
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Detalhes
                    </Button>
                    <Button size="sm" className="flex-1">
                      Localizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
