
import { useState, useEffect } from "react";
import { Search, Plus, FileText, ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  lastVisit: string;
}

interface MedicalRecord {
  id: number;
  patientId: number;
  date: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

const Prontuarios = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    diagnosis: "",
    treatment: "",
    notes: ""
  });

  // Estado para dados persistentes
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);

  // Carregar dados do localStorage quando o componente monta
  useEffect(() => {
    const savedPatients = localStorage.getItem('medsched_patients');
    const savedRecords = localStorage.getItem('medsched_medical_records');

    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    } else {
      // Dados iniciais se não houver dados salvos
      const initialPatients = [
        { id: 1, name: "João Silva", age: 45, phone: "(11) 99999-1111", lastVisit: "2024-01-15" },
        { id: 2, name: "Maria Santos", age: 32, phone: "(11) 99999-2222", lastVisit: "2024-01-10" },
        { id: 3, name: "Pedro Costa", age: 28, phone: "(11) 99999-3333", lastVisit: "2024-01-08" },
      ];
      setPatients(initialPatients);
      localStorage.setItem('medsched_patients', JSON.stringify(initialPatients));
    }

    if (savedRecords) {
      setMedicalRecords(JSON.parse(savedRecords));
    } else {
      // Dados iniciais se não houver dados salvos
      const initialRecords = [
        {
          id: 1,
          patientId: 1,
          date: "2024-01-15",
          doctor: "Dr. Maria Silva",
          diagnosis: "Hipertensão leve",
          treatment: "Medicação anti-hipertensiva",
          notes: "Paciente apresentou pressão arterial elevada. Orientado sobre dieta e exercícios."
        },
        {
          id: 2,
          patientId: 1,
          date: "2023-12-10",
          doctor: "Dr. João Santos",
          diagnosis: "Check-up de rotina",
          treatment: "Nenhum",
          notes: "Exames dentro da normalidade. Retorno em 6 meses."
        },
        {
          id: 3,
          patientId: 2,
          date: "2024-01-10",
          doctor: "Dr. Ana Costa",
          diagnosis: "Resfriado comum",
          treatment: "Repouso e hidratação",
          notes: "Sintomas leves. Medicação sintomática prescrita."
        }
      ];
      setMedicalRecords(initialRecords);
      localStorage.setItem('medsched_medical_records', JSON.stringify(initialRecords));
    }
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const patientRecords = selectedPatient 
    ? medicalRecords.filter(record => record.patientId === selectedPatient.id)
    : [];

  const handleSaveRecord = () => {
    if (!selectedPatient || !newRecord.diagnosis || !newRecord.treatment) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Criar novo prontuário
    const newMedicalRecord: MedicalRecord = {
      id: Date.now(), // Usar timestamp como ID simples
      patientId: selectedPatient.id,
      date: new Date().toISOString().split('T')[0], // Data atual
      doctor: "Dr. Sistema", // Você pode modificar isso para o médico logado
      diagnosis: newRecord.diagnosis,
      treatment: newRecord.treatment,
      notes: newRecord.notes
    };

    // Atualizar estado e localStorage
    const updatedRecords = [...medicalRecords, newMedicalRecord];
    setMedicalRecords(updatedRecords);
    localStorage.setItem('medsched_medical_records', JSON.stringify(updatedRecords));

    // Atualizar última visita do paciente
    const updatedPatients = patients.map(patient => 
      patient.id === selectedPatient.id 
        ? { ...patient, lastVisit: newMedicalRecord.date }
        : patient
    );
    setPatients(updatedPatients);
    localStorage.setItem('medsched_patients', JSON.stringify(updatedPatients));

    toast({
      title: "Prontuário Salvo!",
      description: "O prontuário foi salvo com sucesso.",
    });

    setNewRecord({ diagnosis: "", treatment: "", notes: "" });
    setShowNewRecord(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-100 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate("/home")} className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Prontuários</h1>
          </div>
          <Button onClick={() => navigate("/")}>
            Sair
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Lista de Pacientes */}
          <Card>
            <CardHeader>
              <CardTitle>Pacientes</CardTitle>
              <CardDescription>Selecione um paciente para ver o histórico</CardDescription>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredPatients.map((patient) => (
                  <Card
                    key={patient.id}
                    className={`cursor-pointer transition-colors ${
                      selectedPatient?.id === patient.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.age} anos</div>
                          <div className="text-xs text-gray-400">Última visita: {new Date(patient.lastVisit).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prontuários do Paciente */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {selectedPatient ? `Prontuários - ${selectedPatient.name}` : "Selecione um Paciente"}
                  </CardTitle>
                  {selectedPatient && (
                    <CardDescription>
                      {selectedPatient.age} anos • {selectedPatient.phone}
                    </CardDescription>
                  )}
                </div>
                {selectedPatient && (
                  <Button onClick={() => setShowNewRecord(!showNewRecord)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Prontuário
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!selectedPatient ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Selecione um paciente para visualizar os prontuários</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Formulário para novo prontuário */}
                  {showNewRecord && (
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-green-800">Novo Prontuário</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="diagnosis">Diagnóstico *</Label>
                          <Input
                            id="diagnosis"
                            value={newRecord.diagnosis}
                            onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                            placeholder="Digite o diagnóstico"
                          />
                        </div>
                        <div>
                          <Label htmlFor="treatment">Tratamento *</Label>
                          <Input
                            id="treatment"
                            value={newRecord.treatment}
                            onChange={(e) => setNewRecord({...newRecord, treatment: e.target.value})}
                            placeholder="Digite o tratamento prescrito"
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">Observações</Label>
                          <Textarea
                            id="notes"
                            value={newRecord.notes}
                            onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                            placeholder="Observações adicionais"
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveRecord}>Salvar Prontuário</Button>
                          <Button variant="outline" onClick={() => setShowNewRecord(false)}>
                            Cancelar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Lista de prontuários existentes */}
                  {patientRecords.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p>Nenhum prontuário encontrado para este paciente</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Histórico de Consultas</h3>
                      {patientRecords.map((record) => (
                        <Card key={record.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(record.date).toLocaleDateString()}
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                {record.doctor}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-gray-700">Diagnóstico: </span>
                                <span className="text-gray-600">{record.diagnosis}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Tratamento: </span>
                                <span className="text-gray-600">{record.treatment}</span>
                              </div>
                              {record.notes && (
                                <div>
                                  <span className="font-medium text-gray-700">Observações: </span>
                                  <span className="text-gray-600">{record.notes}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Prontuarios;
