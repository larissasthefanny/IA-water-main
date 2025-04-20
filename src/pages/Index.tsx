
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import WaterDropIcon from "@/components/WaterDropIcon";
import ReminderForm from "@/components/ReminderForm";
import WaterIntakeTracker from "@/components/WaterIntakeTracker";
import reminderService from "@/utils/reminderService";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [nextReminder, setNextReminder] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  
  useEffect(() => {
    // Check if reminders are already running
    const checkRunningStatus = () => {
      const running = reminderService.isRunning();
      setIsRunning(running);
      
      if (running) {
        setNextReminder(reminderService.getNextReminderTime());
      } else {
        setNextReminder(null);
      }
    };
    
    checkRunningStatus();
    
    // Set up timer to update countdown
    const timerId = window.setInterval(() => {
      checkRunningStatus();
      
      if (reminderService.isRunning() && reminderService.getNextReminderTime()) {
        const now = new Date();
        const next = reminderService.getNextReminderTime()!;
        const diff = next.getTime() - now.getTime();
        
        if (diff > 0) {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setTimeLeft(`${minutes}m ${seconds}s`);
        } else {
          setTimeLeft("Agora");
        }
      } else {
        setTimeLeft("");
      }
    }, 1000);
    
    return () => {
      window.clearInterval(timerId);
    };
  }, []);
  
  const startReminders = (interval: number, phoneNumber: string) => {
    reminderService.startReminders({
      interval,
      phoneNumber,
    });
    
    setIsRunning(true);
    toast.success("Lembretes de água iniciados!");
  };
  
  const stopReminders = () => {
    reminderService.stopReminders();
    setIsRunning(false);
    setNextReminder(null);
    setTimeLeft("");
    toast.info("Lembretes de água desativados");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 wave-bg pb-20">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center mb-8">
          <WaterDropIcon size={60} className="mb-2" />
          <h1 className="text-3xl font-bold text-blue-700 text-center">
            Lembrete de Água
          </h1>
          <p className="text-blue-600 text-center max-w-md mt-2">
            Mantenha-se hidratado com lembretes de água enviados diretamente para o seu WhatsApp
          </p>
        </header>
        
        <div className="max-w-md mx-auto grid gap-6">
          <Card className="border-blue-100 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-blue-700">
                Configure seus lembretes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReminderForm 
                onStart={startReminders} 
                isRunning={isRunning} 
                onStop={stopReminders} 
              />
              
              {isRunning && timeLeft && (
                <div className="mt-4 text-center">
                  <div className="text-sm text-blue-600 font-medium">
                    Próximo lembrete em:
                  </div>
                  <div className="text-2xl font-bold text-blue-700">
                    {timeLeft}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <WaterIntakeTracker />
          
          <Card className="border-blue-100 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-blue-700">
                Instruções
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-2">
              <p>
                <span className="font-medium">Passo 1:</span> Insira seu número de WhatsApp com DDD, sem espaços ou caracteres especiais.
              </p>
              <p>
                <span className="font-medium">Passo 2:</span> Defina o intervalo entre os lembretes (padrão: 45 minutos).
              </p>
              <p>
                <span className="font-medium">Passo 3:</span> Clique em "Iniciar Lembretes" para começar a receber notificações.
              </p>
              <p className="mt-4 text-xs text-blue-500">
                Observação: Para funcionar completamente, esta aplicação precisaria de uma integração com a API do WhatsApp Business, que requer aprovação. Para demonstração, abrirá uma janela de chat do WhatsApp com a mensagem pré-preenchida.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
