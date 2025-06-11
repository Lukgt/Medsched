import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  doctor: string;
  date: string;
  time: string;
  symptoms: string;
  status: "agendado" | "confirmado" | "cancelado";
  createdAt: string;
}

const Agendamento = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Carregar consultas e dados do usuário do localStorage quando o componente monta
  useEffect(() => {
    const savedAppointments = localStorage.getItem("medsched_appointments");
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }

    // Carregar nome do usuário logado para preencher o campo patientName
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData && userData.name) {
        setPatientName(userData.name); // Preenche o nome do paciente automaticamente
      }
    }
  }, []);

  const doctors = [
    { id: 1, name: "Dr. Maria Silva", specialty: "Cardiologista" },
    { id: 2, name: "Dr. João Santos", specialty: "Dermatologista" },
    { id: 3, name: "Dr. Ana Costa", specialty: "Pediatra" },
  ];

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  // Verificar se um horário já está ocupado
  const isTimeSlotTaken = (date: Date, time: string, doctor: string) => {
    const dateString = date.toISOString().split("T")[0];
    return appointments.some(
      (appointment) =>
        appointment.date === dateString &&
        appointment.time === time &&
        appointment.doctor === doctor &&
        appointment.status !== "cancelado"
    );
  };

  const handleSchedule = () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !selectedDoctor ||
      !patientName ||
      !patientPhone
    ) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Verificar se o horário já está ocupado
    if (isTimeSlotTaken(selectedDate, selectedTime, selectedDoctor)) {
      toast({
        title: "Erro",
        description:
          "Este horário já está ocupado. Por favor, escolha outro horário.",
        variant: "destructive",
      });
      return;
    }

    // Criar nova consulta
    const newAppointment: Appointment = {
      id: Date.now(),
      patientName,
      patientPhone,
      doctor: selectedDoctor,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      symptoms,
      status: "agendado",
      createdAt: new Date().toISOString(),
    };

    // Atualizar estado e localStorage
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem(
      "medsched_appointments",
      JSON.stringify(updatedAppointments)
    );

    toast({
      title: "Consulta Agendada!",
      description: `Consulta marcada para ${selectedDate.toLocaleDateString()} às ${selectedTime}`,
    });

    // Resetar formulário
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedDoctor("");
    setPatientName("");
    setPatientPhone("");
    setSymptoms("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Agendar Consulta</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Selecionar Médico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {doctors.map((doctor) => (
                  <Button
                    key={doctor.id}
                    variant={
                      selectedDoctor === doctor.name ? "default" : "outline"
                    }
                    className="w-full justify-start"
                    onClick={() => setSelectedDoctor(doctor.name)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-gray-500">
                        {doctor.specialty}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Selecionar Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Selecionar Horário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time, idx) => {
                  let isUnavailable = false;
                  // Deixe os horários das 09:00 e 15:00 indisponíveis para todos os médicos como exemplo
                  if (time === "09:00" || time === "15:00") {
                    isUnavailable = true;
                  } else if (selectedDate && selectedDoctor) {
                    isUnavailable = isTimeSlotTaken(selectedDate, time, selectedDoctor);
                  }
                  return (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      disabled={selectedDate && selectedDoctor ? isUnavailable : false}
                      className={
                        selectedDate && selectedDoctor && isUnavailable
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    >
                      {time}
                      {selectedDate && selectedDoctor && isUnavailable && (
                        <span className="ml-1 text-xs">❌</span>
                      )}
                    </Button>
                  );
                })}
              </div>
              {selectedDate && selectedDoctor && (() => {
                const allUnavailable = timeSlots.every((time) =>
                  (time === "09:00" || time === "15:00") || isTimeSlotTaken(selectedDate, time, selectedDoctor)
                );
                const anyUnavailable = timeSlots.some((time) =>
                  (time === "09:00" || time === "15:00") || (selectedDate && selectedDoctor && isTimeSlotTaken(selectedDate, time, selectedDoctor))
                );
                if (allUnavailable) {
                  return (
                    <p className="text-xs text-red-500 mt-2">
                      Todos os horários estão indisponíveis para {selectedDoctor} nesta data.
                    </p>
                  );
                }
                if (anyUnavailable) {
                  return (
                    <p className="text-xs text-gray-500 mt-2">
                      ❌ = Horário indisponível para {selectedDoctor}
                    </p>
                  );
                }
                return null;
              })()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados do Paciente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patientName">Nome Completo *</Label>
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Digite o nome completo"
                />
              </div>
              <div>
                <Label htmlFor="patientPhone">Telefone *</Label>
                <Input
                  id="patientPhone"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="symptoms">Sintomas/Observações</Label>
                <Textarea
                  id="symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Descreva os sintomas ou motivo da consulta"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de consultas agendadas */}
        {appointments.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Consultas Agendadas Recentemente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {appointments
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .slice(0, 5)
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">
                          {appointment.patientName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {appointment.doctor} •{" "}
                          {new Date(appointment.date).toLocaleDateString()} às{" "}
                          {appointment.time}
                        </div>
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
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => {
                  setAppointments([]);
                  localStorage.removeItem("medsched_appointments");
                  toast({
                    title: "Agendamentos limpos",
                    description: "Todos os agendamentos foram removidos.",
                  });
                }}
              >
                Limpar Agendamentos
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 flex justify-center md:justify-end">
          <Button
            onClick={handleSchedule}
            size="lg"
            className="px-8 w-full md:w-auto"
          >
            Confirmar Agendamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Agendamento;
