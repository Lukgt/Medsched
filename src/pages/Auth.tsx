import { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react"; // Added Camera
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import MedshedLogo from "@/assets/Medshed.svg";
import DoctorImg from "@/assets/CIDdoc.svg"

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [userType, setUserType] = useState("paciente");
  const [signupStep, setSignupStep] = useState(1);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file); // Keep file object if needed for direct upload later

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string); // Store as Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Validação para login
      if (!email || !password) {
        toast({
          title: "Erro",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return;
      }

      const users = JSON.parse(localStorage.getItem('appUsers') || '[]');
      const foundUser = users.find(u => u.email === email);

      if (foundUser && foundUser.password === password) { // WARNING: Plain text password check
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!",
        });
        if (foundUser.userType === "medico") {
          navigate("/prontuarios");
        } else {
          navigate("/home");
        }
      } else {
        toast({
          title: "Erro de Login",
          description: "Email ou senha inválidos.",
          variant: "destructive"
        });
      }
    } else {
      // Cadastro com etapas
      if (signupStep === 1) {
        // Validação primeira etapa
        if (!email || !password || !confirmPassword) {
          toast({
            title: "Erro",
            description: "Por favor, preencha todos os campos obrigatórios.",
            variant: "destructive"
          });
          return;
        }

        if (password !== confirmPassword) {
          toast({
            title: "Erro",
            description: "As senhas não coincidem.",
            variant: "destructive"
          });
          return;
        }
        // Ir para próxima etapa
        setSignupStep(2);
      } else { // Signup step 2
        // Validação segunda etapa
        if (!name || !age) { // Avatar is optional, preview is stored
          toast({
            title: "Erro",
            description: "Por favor, preencha nome e idade.",
            variant: "destructive"
          });
          return;
        }

        const users = JSON.parse(localStorage.getItem('appUsers') || '[]');
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
          toast({
            title: "Erro de Cadastro",
            description: "Este email já está cadastrado.",
            variant: "destructive"
          });
          return;
        }

        // WARNING: Storing plain text password
        const newUser = { name, age, email, password, avatarPreview, userType };
        users.push(newUser);
        localStorage.setItem('appUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        toast({
          title: "Cadastro realizado!",
          description: "Conta criada com sucesso!",
        });

        if (userType === "medico") {
          navigate("/prontuarios");
        } else {
          navigate("/home");
        }
      }
    }
  };

  const handleBackStep = () => {
    if (signupStep > 1) {
      setSignupStep(signupStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center md:items-stretch md:justify-center md:h-[700px]">
        <div className="hidden md:flex flex-1 items-center justify-center rounded-l-xl overflow-hidden bg-white">
          <img src={DoctorImg} alt="Doctor" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex items-center justify-center rounded-r-xl bg-white h-full">
          <Card className="w-full h-full flex flex-col shadow-none border-none bg-transparent">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <div className="w-[80px] h-[80px] bg-[#0BADC9] p-[4px] rounded-lg flex items-center justify-center">
                  <img src={MedshedLogo} />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                {isLogin ? "Entrar" : "Criar Conta"}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin 
                  ? "Entre com suas credenciais para acessar sua conta" 
                  : "Crie sua conta para começar a usar o MEDSCHED"
                }
              </CardDescription>
            </CardHeader>            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && signupStep === 2 && (
                  <>
                    <div className="flex flex-col items-center space-y-2">
                      <Label htmlFor="avatar" className="cursor-pointer">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-gray-300">
                            <Camera className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                      </Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome completo"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="age">Idade</Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Digite sua idade"
                        required
                      />
                    </div>
                  </>
                )}

                {(isLogin || (!isLogin && signupStep === 1)) && (
                  <>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Digite sua senha"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>                    {!isLogin && (
                      <div>
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirme sua senha"
                          required
                        />
                      </div>
                    )}

                    {!isLogin && (
                      <div>
                        <Label>Tipo de Usuário</Label>
                        <div className="flex space-x-4 mt-2">
                          <Button
                            type="button"
                            variant={userType === "paciente" ? "default" : "outline"}
                            onClick={() => setUserType("paciente")}
                            className="flex-1"
                          >
                            Paciente
                          </Button>
                          <Button
                            type="button"
                            variant={userType === "medico" ? "default" : "outline"}
                            onClick={() => setUserType("medico")}
                            className="flex-1"
                          >
                            Médico
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="flex space-x-4">
                  {!isLogin && signupStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBackStep}
                      className="flex-1"
                    >
                      Voltar
                    </Button>
                  )}
                  <Button type="submit" className="flex-1 bg-[#0BADC9]">
                    {isLogin 
                      ? "Entrar" 
                      : signupStep === 1 
                        ? "Continuar" 
                        : "Criar Conta"
                    }
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setSignupStep(1);
                    }}
                    className="text-sm"
                  >
                    {isLogin 
                      ? "Não tem uma conta? Cadastre-se" 
                      : "Já tem uma conta? Faça login"
                    }
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
