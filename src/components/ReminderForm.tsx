
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface ReminderFormProps {
  onStart: (interval: number, phoneNumber: string) => void;
  isRunning: boolean;
  onStop: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ 
  onStart, 
  isRunning, 
  onStop 
}) => {
  const [interval, setInterval] = useState(45);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast.error("Por favor, insira seu número de WhatsApp");
      return;
    }
    
    // Format phone number: remove non-numeric characters and check format
    const formattedNumber = phoneNumber.replace(/\D/g, "");
    if (formattedNumber.length < 10) {
      toast.error("Número de telefone inválido");
      return;
    }
    
    onStart(interval, formattedNumber);
    toast.success(`Lembretes configurados a cada ${interval} minutos`);
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Seu número de WhatsApp (com DDD)
        </label>
        <Input
          type="tel"
          placeholder="(99) 99999-9999"
          value={phoneNumber}
          onChange={handlePhoneChange}
          disabled={isRunning}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Exemplo: 11987654321 (sem espaços ou caracteres especiais)
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium">
            Intervalo entre lembretes
          </label>
          <span className="text-sm font-semibold bg-secondary px-2 py-1 rounded">
            {interval} minutos
          </span>
        </div>
        
        <Slider
          defaultValue={[45]}
          min={15}
          max={120}
          step={5}
          onValueChange={(value) => setInterval(value[0])}
          disabled={isRunning}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>15 min</span>
          <span>120 min</span>
        </div>
      </div>
      
      {isRunning ? (
        <Button 
          type="button" 
          variant="destructive" 
          onClick={onStop}
          className="w-full"
        >
          Parar Lembretes
        </Button>
      ) : (
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
        >
          Iniciar Lembretes
        </Button>
      )}
    </form>
  );
};

export default ReminderForm;
